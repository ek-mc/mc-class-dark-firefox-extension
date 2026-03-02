(() => {
  const patchNoPhoto = () => {
    const imgs = document.querySelectorAll('img.w-100, img[src*="NoPhoto.jpg"], img[src*="nophoto.jpg"]');
    imgs.forEach((img) => {
      const src = (img.getAttribute('src') || '').toLowerCase();
      const isNoPhoto = src.includes('/admin/lessons/cover/nophoto.jpg') || src.includes('/admin/news/photos/nophoto.jpg');
      if (!isNoPhoto) return;
      if (img.dataset.darkPatched === '1') return;
      img.dataset.darkPatched = '1';
      img.src = 'https://placehold.co/1200x675/161a22/f2f6ff?text=No+Preview';
      img.style.background = '#161a22';
      img.style.border = '1px solid #2f3440';
      img.style.borderRadius = '8px';
    });
  };

  patchNoPhoto();
  document.addEventListener('DOMContentLoaded', patchNoPhoto);
  new MutationObserver(patchNoPhoto).observe(document.documentElement, { childList: true, subtree: true });
})();
