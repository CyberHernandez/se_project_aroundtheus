export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings._inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._element = formElement;
  }

  _showInputError(inputElement, errorMessageElement) {
    errorMessageElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement, options) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement, options);
    }
    this._hideInputError(inputElement, options);
  }

  _hasInvalidInput(inputList) {
    return !inputList.every(
      (inputElement) => this._inputElement.validity.valid
    );
  }

  _toggleButtonState(inputElements, submitButton, { inactiveButtonClass }) {
    let foundInvalid = false;
    inputElements.forEach((inputElement) => {
      if (!inputElement.validity.valid) {
        foundInvalid = true;
      }
    });
    if (foundInvalid) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
    return;
  }

  _setEventListeners(options) {
    const { inputSelector } = options;
    const inputElements = [...this._element.querySelectorAll(inputSelector)];
    const submitButton = this._element.querySelector(
      options.submitButtonSelector
    );
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(inputElement, options);
        this._toggleButtonState(inputElements, submitButton, options);
      });
    });
  }

  enableValidation(options) {
    this._element.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setEventListeners(options);
  }
}
