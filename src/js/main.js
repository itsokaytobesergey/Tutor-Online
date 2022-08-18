import './utils/addSvgSprite.js';

import Modal from './modules/Modal';
import Tooltip from './modules/Tooltip';

import { initMobileMenu } from './modules/mobileMenu.js';

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
