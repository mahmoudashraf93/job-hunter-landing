// All content and navigation work without JavaScript. Enhance the reading outline
// with the current section and close the compact mobile outline after a jump.
(() => {
  const links = [...document.querySelectorAll('.toc a[data-section]')];
  if (!links.length) return;
  const sections = [...new Set(links.map((link) => document.getElementById(link.dataset.section)))].filter(Boolean);
  const activate = (id) => links.forEach((link) => {
    if (link.dataset.section === id) {
      link.setAttribute('aria-current', 'location');
      const more = link.closest('.toc-more');
      if (more) more.open = true;
    }
    else link.removeAttribute('aria-current');
  });
  const activateFromHash = () => {
    const section = sections.find((item) => `#${item.id}` === window.location.hash);
    if (section) activate(section.id);
  };
  activateFromHash();
  window.addEventListener('hashchange', activateFromHash);
  links.forEach((link) => link.addEventListener('click', () => {
    activate(link.dataset.section);
    const compactOutline = link.closest('.mobile-contents');
    if (compactOutline) compactOutline.open = false;
    // Move keyboard focus to the destination so subsequent tabbing continues
    // in the article rather than inside a now-collapsed outline.
    document.getElementById(link.dataset.section)?.focus({ preventScroll: true });
  }));
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(() => {
    const current = sections.filter((section) => section.getBoundingClientRect().top <= 150).at(-1) ?? sections[0];
    if (current) activate(current.id);
  }, { rootMargin: '-1px 0px -65% 0px', threshold: [0, 1] });
  sections.forEach((section) => observer.observe(section));
})();
