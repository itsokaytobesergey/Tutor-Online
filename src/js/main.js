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
const burger = document.querySelector('.header__controls--burger');
const menu = document.querySelector('.menu-mobile');
const body = document.body;
const button = document.querySelector('[data-btn]');

burger.addEventListener('click', () => {
  body.classList.toggle('stop-scroll');
  menu.classList.toggle('menu-mobile--visible');
  burger.classList.toggle('burger--active');
  button.classList.toggle('is-hidden');
});

const menuMobileItems = document.querySelectorAll('.menu-mobile__item');
menuMobileItems.forEach(e => {
  e.addEventListener('click', () => {
    body.classList.toggle('stop-scroll');
    menu.classList.toggle('menu-mobile--visible');
    burger.classList.toggle('burger--active');
    button.classList.toggle('is-hidden');
  });
});

// ////////selector

// class Test {
//   constructor(selector) {
//     this.selector = selector;

//     this.dropdownInput = selector.querySelector('[data-id="dropdownInput"]');
//     this.dropdownInputText = selector.querySelector('[data-id="dropdownInputText"]');
//     this.dropdownMenu = selector.querySelector('[data-id="subject"]');
//     this.dropdownMenuList = selector.querySelectorAll('[data-id="subject"]');
//     this.dropdownArrow = selector.querySelector('[data-id="dropdownArrow"]');
//     this.submitButton = selector.querySelector('[data-id="submitButton"]');
//     this.listItem = selector.querySelectorAll('.dropdown__item');
//     this.inputField = selector.querySelector('[data-id="input"]');
//     this.dropdownBackground = document.querySelector('[data-id="dropdownBackground"]');
//     this.dropdownTickets = selector.querySelectorAll('[data-id="dropdownTickets"]');
//     this.submitButton = document.querySelector('[data-id="submitButton"]');
//     this.errorSign = document.querySelectorAll('[data-id="error"]');
//     this.dropdownInput = document.querySelectorAll('[data-id="dropdownInput"]');
//     this.dropdownInputText = document.querySelectorAll('[data-id="dropdownInputText"]');

//     this.dropdownMenuNumber1 = document.querySelector('[data-number="1"]');
//     this.dropdownMenuNumber2 = document.querySelector('[data-number="2"]');

//     this.init();
//   }

//   init() {
//     this.dropdownBackground.addEventListener('click', () => {
//       this.dropdownBackground.classList.add('is-hidden');
//       this.dropdownMenu.classList.add('is-hidden');
//       this.dropdownArrow.classList.remove('rotateMe');
//     });

//     document.addEventListener('keydown', e => {
//       if (e.key === 'Tab' || e.key === 'Escape') {
//         this.dropdownBackground.classList.add('is-hidden');
//         this.dropdownMenu.classList.add('is-hidden');
//         this.dropdownArrow.classList.remove('rotateMe');
//       }
//     });

//     this.selector.addEventListener('click', () => {
//       this.dropdownMenu.classList.toggle('is-hidden');
//       this.dropdownArrow.classList.toggle('rotateMe');
//       this.dropdownBackground.classList.toggle('is-hidden');
//     });

//     this.listItem.forEach(el => {
//       el.addEventListener('click', () => {
//         this.listItem.forEach(e => {
//           e.classList.remove('dropdown__item--choosed');
//           e.lastChild.classList.add('is-hidden');
//         });

//         el.classList.add('dropdown__item--choosed');
//         el.lastChild.classList.remove('is-hidden');

//         console.log(this.dropdownInputText);
//         this.dropdownInputText.innerText = el.innerText;
//         this.inputField.value = el.dataset.value;
//       });
//     });
//   }
// }

// document.querySelectorAll('[data-id="selector"]').forEach(selector => {
//   // dropdownFunction(selector);
//   new Test(selector);
// });

document.querySelectorAll('[data-id="selector"]').forEach(selector => {
  dropdownFunction(selector);
});

function dropdownFunction(selector) {
  const dropdownInput = selector.querySelector('[data-id="dropdownInput"]');
  const dropdownInputText = selector.querySelector('[data-id="dropdownInputText"]');
  const dropdownMenu = selector.querySelector('[data-id="subject"]');
  const dropdownArrow = selector.querySelector('[data-id="dropdownArrow"]');
  const submitButton = selector.querySelector('[data-id="submitButton"]');
  const listItem = selector.querySelectorAll('.dropdown__item');
  const inputField = selector.querySelector('[data-id="input"]');
  const dropdownBackground = document.querySelector('[data-id="dropdownBackground"]');
  const dropdownTickets = selector.querySelectorAll('[data-id="dropdownTickets"]');

  //тык вне поля дропдауна
  dropdownBackground.addEventListener('click', () => {
    dropdownBackground.classList.add('is-hidden');
    dropdownMenu.classList.add('is-hidden');
    dropdownArrow.classList.remove('rotateMe');
  });

  //закрытие дропдауна на escape & tab
  document.addEventListener('keydown', e => {
    if (e.key === 'Tab' || e.key === 'Escape') {
      dropdownBackground.classList.add('is-hidden');
      dropdownMenu.classList.add('is-hidden');
      dropdownArrow.classList.remove('rotateMe');
    }
  });
  //открытие дропдауна
  selector.addEventListener('click', () => {
    dropdownMenu.classList.toggle('is-hidden');
    dropdownArrow.classList.toggle('rotateMe');
    dropdownBackground.classList.toggle('is-hidden');
  });

  //присваивание инпуту выбранного значения + подсветка выбранной строки
  listItem.forEach(el => {
    el.addEventListener('click', () => {
      listItem.forEach(e => {
        e.classList.remove('dropdown__item--choosed');
        e.lastChild.classList.add('is-hidden');
      });

      el.classList.add('dropdown__item--choosed');
      el.lastChild.classList.remove('is-hidden');

      dropdownInputText.innerText = el.innerText;
      inputField.value = el.dataset.value;
    });
  });
}

//если ничего не выбрано, тык по кнопке даст ошибку [bubbling suka]
const submitButton = document.querySelector('[data-id="submitButton"]');
const errorSign = document.querySelectorAll('[data-id="error"]');
const dropdownInput = document.querySelectorAll('[data-id="dropdownInput"]');
const dropdownInputText = document.querySelectorAll('[data-id="dropdownInputText"]');

submitButton.addEventListener('click', e => {
  if (dropdownInputText[0].innerHTML === `Выберите предмет`) {
    dropdownInput[0].classList.add('error');
    errorSign[0].classList.remove('is-hidden');
  } else {
    dropdownInput[0].classList.remove('error');
    errorSign[0].classList.add('is-hidden');
  }
  if (dropdownInputText[1].innerHTML === `Выберите роль`) {
    dropdownInput[1].classList.add('error');
    errorSign[1].classList.remove('is-hidden');
  } else {
    dropdownInput[1].classList.remove('error');
    errorSign[1].classList.add('is-hidden');
  }
  //для других инпутов
  if (document.getElementById('name').value === ``) {
    document.getElementById('name').classList.add('error');
    document.querySelector('[data-id="error_name"]').classList.remove('is-hidden');
  } else {
    document.getElementById('name').classList.remove('error');
    document.querySelector('[data-id="error_name"]').classList.add('is-hidden');
  }
  if (document.getElementById('tel').value === ``) {
    document.getElementById('tel').classList.add('error');
    document.querySelector('[data-id="error_tel"]').classList.remove('is-hidden');
  } else {
    document.getElementById('tel').classList.remove('error');
    document.querySelector('[data-id="error_tel"]').classList.add('is-hidden');
  }
});
