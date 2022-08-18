const modalStack = {
  stack: [],
  currentOpened: false,

  put(modal) {
    if (this.currentOpened && this.currentOpened !== modal) {
      this.stack.push(this.currentOpened);
      this.currentOpened.hide();
    }

    this.currentOpened = modal;
  },

  pop() {
    const modal = this.stack.length ? this.stack.pop() : false;

    this.currentOpened = modal;

    if (modal) {
      modal.show();
    }
  },
};

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalStack.currentOpened) {
    modalStack.currentOpened.close();
  }
});

class Modal {
  constructor(modal) {
    this.modal = modal;
    this.modalInner = modal.querySelector('.js-modal-inner');
    this.buttons = document.querySelectorAll(`.js-modal-btn[data-modal="${modal.dataset.modal}"]`);
    this.closeButtons = modal.querySelectorAll('.js-modal-close');

    this.offsetClick = this.modal.dataset.offsetclick !== 'none';
    this.hashOpenKey = this.modal.dataset.hashOpen;

    this.state = {
      isOpened: false,
    };

    this.linkButtons();
    this.addListeners();

    if (this.hashOpenKey && location.hash === '#' + this.hashOpenKey) {
      this.open();
    }
  }

  hide() {
    this.state.isOpened = false;
    this.modal.classList.remove('is-opened');
    document.documentElement.classList.remove('is-modal-opened');
  }

  show() {
    this.state.isOpened = true;
    this.modal.classList.add('is-opened');
    document.documentElement.classList.add('is-modal-opened');
  }

  open(options) {
    modalStack.put(this);

    if (options) {
      if (options.closePrev) {
        Object.keys(window.modals).forEach(key => {
          window.modals[key].close();
        });
      }
    }

    if (this.onOpen) {
      this.onOpen(options.triggerButton);
    }

    this.show();
  }

  close() {
    modalStack.pop();

    if (this.onClose) {
      this.onClose();
    }

    this.hide();
  }

  linkButtons() {
    [].forEach.call(this.buttons, button => {
      button.addEventListener('click', e => {
        this.open({
          triggerButton: e.currentTarget,
          closePrev: e.currentTarget.dataset.closePrevious,
        });
      });
    });

    [].forEach.call(this.closeButtons, button => {
      button.addEventListener('click', () => {
        this.close();
      });
    });
  }

  addListeners() {
    this.modal.addEventListener('click', e => {
      if (!this.modalInner.contains(e.target)) {
        this.close();
      }
    });
  }
}

export default Modal;
