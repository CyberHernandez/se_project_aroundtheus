import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor( popupSelector, handleFormSubmit ) {
    super({popupSelector});
    this._popupForm = this._popupElement.querySelector('.modal__form')
    this._handleFormSubmit = handleFormSubmit;
  }

close() {
    this._popupForm.reset();
    super.close();
}

}



// how to instantiate it in index.js

const newCardPopup = new PopupWithForm('#new-card-popup', ( => {}));
newCardPopup.open()

newCardPopup.close();