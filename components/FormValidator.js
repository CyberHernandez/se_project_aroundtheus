export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
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

  _hasInvalidInput() {
    return !this._inputElements.every(
      (inputElement) => inputElement.validity.valid
    );
  }
  _checkFormValidity() {
    return this._inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  toggleButtonState() {
    const foundInvalid = this._checkFormValidity();
    if (foundInvalid) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _setEventListeners(options) {
    const { inputSelector } = options;
    this._inputElements = [...this._element.querySelectorAll(inputSelector)];
    this._submitButton = this._element.querySelector(
      options.submitButtonSelector
    );
    this.toggleButtonState();
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(inputElement, options);
        this.toggleButtonState();
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
