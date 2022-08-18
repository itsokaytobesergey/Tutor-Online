export default class Tooltip {
  constructor(elem) {
    this.tooltip = elem;

    this.id = this.tooltip.dataset.tooltip;

    this.triggerButtons = document.querySelectorAll(`.js-tooltip-btn[data-tooltip="${this.id}"]`);
    this.closeButtons = this.tooltip.querySelectorAll('.js-tooltip-close');

    this.init();
  }

  init() {
    this.initButtons();
    this.initClickOutside();
  }

  initClickOutside() {
    document.addEventListener('click', e => {
      if (e.target.closest('.js-tooltip-btn') || this.tooltip.contains(e.target)) {
        return;
      }

      this.close();
    });
  }

  initButtons() {
    [].forEach.call(this.triggerButtons, button => {
      button.addEventListener('click', () => {
        this.open(button);
      });
    });

    [].forEach.call(this.closeButtons, button => {
      button.addEventListener('click', () => {
        this.close();
      });
    });
  }

  open(button) {
    const btnPosition = button.getBoundingClientRect();
    const adjust = button.dataset.adjust || 'bottom';

    this.tooltip.classList.add('is-visible');

    const topPos =
      adjust === 'bottom'
        ? window.scrollY + btnPosition.top + button.offsetHeight + 10
        : window.scrollY + btnPosition.top - this.tooltip.offsetHeight - 10;

    this.tooltip.style.left = `${btnPosition.left + button.offsetWidth - this.tooltip.offsetWidth}px`;
    this.tooltip.style.top = `${topPos}px`;

    this.onOpen(button);
  }

  close() {
    this.tooltip.classList.remove('is-visible');
  }

  onOpen(button) {
    const textContainer = this.tooltip.querySelector('.js-tooltip-content');
    const content = button.dataset.content;

    textContainer.textContent = content;
  }

  onClose() {}
}
