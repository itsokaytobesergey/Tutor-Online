export function initMobileMenu() {
  const menuTrigger = document.querySelector('.js-menu-trigger');
  const menu = document.querySelector('.js-menu');
  const menuClose = document.querySelector('.js-menu-close');

  if (menuTrigger && menu && menuClose) {
    menuTrigger.addEventListener('click', () => {
      menu.classList.add('is-opened');
      document.documentElement.classList.add('is-modal-opened');
    });

    menuClose.addEventListener('click', () => {
      menu.classList.remove('is-opened');
      document.documentElement.classList.remove('is-modal-opened');
    });
  }
}

export function initMobileSidebar() {
  const sidebar = document.querySelector('.js-cabinet-sidebar');
  const trigger = document.querySelector('.js-cabinet-sidebar-toggle');

  if (trigger && sidebar) {
    trigger.addEventListener('click', () => {
      sidebar.classList.toggle('is-opened');
    });
  }
}
