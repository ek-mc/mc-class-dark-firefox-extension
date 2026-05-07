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

  const forceListViewByClick = () => {
    const listIcon = document.querySelector('i.LessonView.RDCicon-list');
    const gridIcon = document.querySelector('i.LessonView.RDCicon-grid-view');
    if (!listIcon || !gridIcon) return;

    const key = `mc-class-force-list-clicked:${location.pathname}${location.search}`;
    const gridActive = (gridIcon.className || '').toLowerCase().includes('active');
    if (!gridActive) {
      sessionStorage.setItem(key, '1');
      return;
    }
    if (sessionStorage.getItem(key) === '1') return;

    listIcon.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    listIcon.click();
    sessionStorage.setItem(key, '1');
  };

  const apply = () => {
    patchNoPhoto();
    forceListViewByClick();
  };

  apply();
  document.addEventListener('DOMContentLoaded', apply);
  new MutationObserver(apply).observe(document.documentElement, { childList: true, subtree: true });
})();
