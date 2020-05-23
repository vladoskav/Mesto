/* eslint-disable class-methods-use-this */
'use strict';

class FormValidator {

  constructor(neededForm, errors) {
    this.neededForm = neededForm;
    this.errors = errors;
    this._setEventListeners(this.neededForm);
  }

  _checkInputValidity(element) {
    const errorElement = element.nextElementSibling;

    if (element.validity.valueMissing) {
      errorElement.textContent = this.errors.valueMissing;
      return false
    }
    if (element.validity.tooShort || element.validity.tooLong) {
      errorElement.textContent = this.errors.tooShort;
      return false
    }
    if (element.validity.typeMismatch) {
      errorElement.textContent = this.errors.typeMismatch;
      return false
    }

    errorElement.textContent = '';
    return true

  }

  _enableButton(button) {
    button.removeAttribute('disabled');
    button.classList.add('popup__button_enabled')
  }

  _disableButton(button) {
    button.setAttribute('disabled', true);
    button.classList.remove('popup__button_enabled');
  }

  _setSubmitButtonState(button, inputs) {
    let isValidForm = true;

    inputs.forEach((elem) => {
      if (!this._checkInputValidity(elem)) {
        isValidForm = false
      }
    });

    if (isValidForm) {
      this._enableButton(button)
    } else {
      this._disableButton(button);
    }
  }

  _setEventListeners(form) {
    const input = form.getElementsByTagName('input');
    const inputs = Array.from(input);
    form.addEventListener('input', () => this._setSubmitButtonState(form.elements.button, inputs));
    form.addEventListener('input', (event) => this._checkInputValidity(event.target));

  }
}


