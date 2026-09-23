(() => {
  const menu = document.querySelector('[data-mobile-menu]');
  if (menu) {
    menu.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary')?.focus(); }
    });
    menu.querySelector('nav')?.addEventListener('click', event => {
      if (event.target.closest('a')) menu.open = false;
    });
    const desktop = matchMedia('(min-width: 1101px)');
    desktop.addEventListener('change', () => { if (desktop.matches) menu.open = false; });
  }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const items = [...document.querySelectorAll('.reveal')];
  let observer;
  function stopMotion() {
    observer?.disconnect(); observer = undefined;
    for (const item of items) { item.classList.remove('motion-enter'); item.style.animation = 'none'; }
    document.body.classList.remove('motion-ready');
  }
  function startMotion() {
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    for (const item of items) item.style.removeProperty('animation');
    document.body.classList.add('motion-ready');
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('motion-enter');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -32px 0px', threshold: .08 });
    for (const item of items) observer.observe(item);
  }
  reduced.addEventListener('change', () => { stopMotion(); if (!reduced.matches) startMotion(); });
  startMotion();
})();
