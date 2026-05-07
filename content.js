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

  const findListToggle = () => {
    const candidates = Array.from(document.querySelectorAll('button, a, [role="button"], [class*="view" i], [id*="view" i]'));
    return candidates.find((el) => {
      const idClass = `${el.id || ''} ${el.className || ''}`.toLowerCase();
      const text = (el.textContent || '').trim().toLowerCase();
      const hasListHint =
        /(^|[^a-z])(list|λίστα)([^a-z]|$)/i.test(text) ||
        idClass.includes('list') ||
        el.querySelector('.fa-list, .fa-list-ul, .bi-list, [class*="list" i]');
      const isHidden = el.offsetParent === null;
      return !!hasListHint && !isHidden;
    });
  };

  const isListActive = (el) => {
    if (!el) return false;
    const cls = `${el.className || ''}`.toLowerCase();
    return el.getAttribute('aria-pressed') === 'true' || cls.includes('active') || cls.includes('selected');
  };

  const forceListView = () => {
    try { localStorage.setItem('mc-class-preferred-view', 'list'); } catch {}

    const perPathKey = `mc-class-list-forced:${location.pathname}`;
    if (sessionStorage.getItem(perPathKey) === '1') return;

    const toggle = findListToggle();
    if (!toggle) return;
    if (isListActive(toggle)) {
      sessionStorage.setItem(perPathKey, '1');
      return;
    }

    toggle.click();
    sessionStorage.setItem(perPathKey, '1');
  };

  const apply = () => {
    patchNoPhoto();
    forceListView();
  };

  apply();
  document.addEventListener('DOMContentLoaded', apply);
  new MutationObserver(apply).observe(document.documentElement, { childList: true, subtree: true });
})();
