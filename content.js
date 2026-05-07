(() => {
  const patchNoPhoto = () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><rect width="1200" height="675" fill="#161a22"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#f2f6ff" font-size="54" font-family="Arial, sans-serif">No Preview</text></svg>`;
    const placeholderDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

    const imgs = document.querySelectorAll('img.w-100, img[src*="NoPhoto.jpg"], img[src*="nophoto.jpg"]');
    imgs.forEach((img) => {
      const src = (img.getAttribute('src') || '').toLowerCase();
      const isNoPhoto = src.includes('/admin/lessons/cover/nophoto.jpg') || src.includes('/admin/news/photos/nophoto.jpg');
      if (!isNoPhoto) return;
      if (img.dataset.darkPatched === '1') return;
      img.dataset.darkPatched = '1';
      img.src = placeholderDataUri;
      img.style.background = '#161a22';
      img.style.border = '1px solid #2f3440';
      img.style.borderRadius = '8px';
    });
  };

  const PREF_KEY = 'mc-class-preferred-view';
  const FORCED_KEY = `mc-class-view-applied:${location.pathname}`;

  const getViewToggles = () => {
    const candidates = Array.from(document.querySelectorAll('button, a, [role="button"], [class*="view" i], [id*="view" i]'));
    let list = null;
    let grid = null;

    for (const el of candidates) {
      const idClass = `${el.id || ''} ${el.className || ''}`.toLowerCase();
      const text = (el.textContent || '').trim().toLowerCase();
      const hasListHint =
        /(^|[^a-z])(list|λίστα)([^a-z]|$)/i.test(text) ||
        idClass.includes('list') ||
        el.querySelector('.fa-list, .fa-list-ul, .bi-list, [class*="list" i]');
      const hasGridHint =
        /(^|[^a-z])(grid|πλέγμα)([^a-z]|$)/i.test(text) ||
        idClass.includes('grid') ||
        el.querySelector('.fa-th, .fa-th-large, .bi-grid, [class*="grid" i]');
      const isHidden = el.offsetParent === null;
      if (isHidden) continue;
      if (!list && hasListHint) list = el;
      if (!grid && hasGridHint) grid = el;
      if (list && grid) break;
    }

    return { list, grid };
  };

  const isActive = (el) => {
    if (!el) return false;
    const cls = `${el.className || ''}`.toLowerCase();
    return el.getAttribute('aria-pressed') === 'true' || cls.includes('active') || cls.includes('selected');
  };

  const bindPreferenceTracking = () => {
    const { list, grid } = getViewToggles();
    if (list && list.dataset.mcPrefBound !== '1') {
      list.dataset.mcPrefBound = '1';
      list.addEventListener('click', () => {
        try { localStorage.setItem(PREF_KEY, 'list'); } catch {}
      });
    }
    if (grid && grid.dataset.mcPrefBound !== '1') {
      grid.dataset.mcPrefBound = '1';
      grid.addEventListener('click', () => {
        try { localStorage.setItem(PREF_KEY, 'grid'); } catch {}
      });
    }
  };

  const applyPreferredView = () => {
    bindPreferenceTracking();

    const { list, grid } = getViewToggles();
    if (!list && !grid) return;

    let pref = 'list';
    try {
      pref = localStorage.getItem(PREF_KEY) || 'list';
      if (!localStorage.getItem(PREF_KEY)) localStorage.setItem(PREF_KEY, pref);
    } catch {}

    if (sessionStorage.getItem(FORCED_KEY) === '1') return;

    if (pref === 'grid') {
      if (grid && !isActive(grid)) grid.click();
      sessionStorage.setItem(FORCED_KEY, '1');
      return;
    }

    if (list && !isActive(list)) list.click();
    sessionStorage.setItem(FORCED_KEY, '1');
  };

  const apply = () => {
    patchNoPhoto();
    applyPreferredView();
  };

  apply();
  document.addEventListener('DOMContentLoaded', apply);
  new MutationObserver(apply).observe(document.documentElement, { childList: true, subtree: true });
})();
