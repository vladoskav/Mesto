'use strict';

class Popup {
  constructor(container, closeButton) {
    this.container = container;
    this.closeButton = closeButton;
    this._setEventListeners();
  }

  open() {
    this.container.classList.add('popup_is-opened');
  }

  close() {
    this.container.classList.remove('popup_is-opened');
  }

  _setEventListeners() {
    this.closeButton.addEventListener('click', () => {
      this.close();

    });

  }
}
