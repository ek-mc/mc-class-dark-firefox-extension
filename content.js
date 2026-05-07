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
  const RETRY_KEY = `mc-class-view-retries:${location.pathname}`;

  const getCurrentView = () => {
    const input = document.querySelector('#ctl00_cphMain_txtHiddenLessonView');
    const val = (input && input.value || '').trim();
    if (val === '2') return 'list';
    if (val === '1') return 'grid';

    const listIcon = document.querySelector('i.LessonView.RDCicon-list');
    const gridIcon = document.querySelector('i.LessonView.RDCicon-grid-view');
    if (listIcon?.className?.toLowerCase().includes('active')) return 'list';
    if (gridIcon?.className?.toLowerCase().includes('active')) return 'grid';
    return null;
  };

  const getViewToggles = () => {
    const candidates = Array.from(document.querySelectorAll('button, a, i, [role="button"], [class*="view" i], [id*="view" i], [title*="view" i]'));
    let list = null;
    let grid = null;

    for (const el of candidates) {
      const idClass = `${el.id || ''} ${el.className || ''}`.toLowerCase();
      const text = (el.textContent || '').trim().toLowerCase();
      const title = (el.getAttribute('title') || '').trim().toLowerCase();
      const onclick = (el.getAttribute('onclick') || '').toLowerCase();

      const hasListHint =
        /(^|[^a-z])(list|λίστα|listview)([^a-z]|$)/i.test(`${text} ${title}`) ||
        idClass.includes('list') ||
        onclick.includes("val('2')") ||
        onclick.includes('val("2")') ||
        !!el.querySelector?.('.fa-list, .fa-list-ul, .bi-list, [class*="list" i]');

      const hasGridHint =
        /(^|[^a-z])(grid|πλέγμα|gridview)([^a-z]|$)/i.test(`${text} ${title}`) ||
        idClass.includes('grid') ||
        onclick.includes("val('1')") ||
        onclick.includes('val("1")') ||
        !!el.querySelector?.('.fa-th, .fa-th-large, .bi-grid, [class*="grid" i]');

      const isHidden = el.offsetParent === null;
      if (isHidden) continue;
      if (!list && hasListHint) list = el;
      if (!grid && hasGridHint) grid = el;
      if (list && grid) break;
    }

    return { list, grid };
  };

  const switchView = (el, value) => {
    if (!el) return false;

    const input = document.querySelector('#ctl00_cphMain_txtHiddenLessonView');
    if (input) input.value = value;

    const onclick = el.getAttribute('onclick') || '';
    const m = onclick.match(/__doPostBack\('([^']+)'\s*,\s*'([^']*)'\)/);

    if (typeof window.__doPostBack === 'function') {
      const target = m?.[1] || 'ctl00_cphMain_upPanelLessonView';
      const arg = m?.[2] || 'update';
      window.__doPostBack(target, arg);
      return true;
    }

    el.click();
    return true;
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

    const current = getCurrentView();

    // If already in preferred view, mark applied for this path and stop.
    if (current === pref) {
      sessionStorage.setItem(FORCED_KEY, '1');
      return;
    }

    const retries = Number(sessionStorage.getItem(RETRY_KEY) || '0');

    // If view mismatches preference, force postback switch.
    if (pref === 'grid') {
      if (grid && switchView(grid, '1')) {
        sessionStorage.setItem(FORCED_KEY, '1');
        sessionStorage.setItem(RETRY_KEY, '0');
        return;
      }
    } else {
      if (list && switchView(list, '2')) {
        sessionStorage.setItem(FORCED_KEY, '1');
        sessionStorage.setItem(RETRY_KEY, '0');
        return;
      }
    }

    if (retries < 12) {
      sessionStorage.setItem(RETRY_KEY, String(retries + 1));
      setTimeout(applyPreferredView, 250);
    }
  };

  const apply = () => {
    patchNoPhoto();
    applyPreferredView();
  };

  apply();
  document.addEventListener('DOMContentLoaded', apply);
  new MutationObserver(apply).observe(document.documentElement, { childList: true, subtree: true });
})();
