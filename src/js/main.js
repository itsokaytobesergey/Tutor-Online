import './utils/addSvgSprite.js';

import Modal from './modules/Modal';
import Tooltip from './modules/Tooltip';

import { initMobileMenu } from './modules/mobileMenu.js';

// import Swiper from 'swiper/bundle';
import Swiper, { Navigation, Pagination } from 'swiper';
import { doc } from 'prettier';

initModals();
initTooltips();
initMobileMenu();

function initModals() {
  window.modals = {};

  const modalNodes = document.querySelectorAll('.js-modal');

  modalNodes.forEach(modalNode => {
    window.modals[modalNode.dataset.modal] = new Modal(modalNode);
  });
}

function initTooltips() {
  window.tooltips = {};

  const tooltipNodes = document.querySelectorAll('.js-tooltip');

  tooltipNodes.forEach(tooltipNode => {
    window.tooltips[tooltipNode.dataset.tooltip] = new Tooltip(tooltipNode);
  });
}

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  spaceBetween: 20,
  slidesPerView: 'auto',
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

//menu burger
const burger = document?.querySelector('.header__controls--burger');
const menu = document?.querySelector('.menu-mobile');
const body = document.body;
const button = document?.querySelector('[data-btn]');

burger?.addEventListener('click', () => {
  body.classList.toggle('stop-scroll');
  menu?.classList.toggle('menu-mobile--visible');
  burger?.classList.toggle('burger--active');
  button?.classList.toggle('is_unvisible');
});
