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
    errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(formElement, inputElement, options) {
    if (!this._inputElement.validity.valid) {
      return _showInputError(formElement, inputElement, options);
    }
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

  _setEventListeners(formElement, options) {
    const { inputSelector } = options;
    const inputElements = [...formElement.querySelectorAll(inputSelector)];
    const submitButton = formElement.querySelector(
      options.submitButtonSelector
    );
  }

  enableValidation(options) {
    const formElements = [...document.querySelectorAll(options.formSelector)];

    this._element.addEventListener("submit", (event) => {
      event.preventDefault();
      //implementation of the listener
    });
    _setEventListeners(this._element, options);
  }
}

/* from project #6...
const configuration = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(configuration);
*/
