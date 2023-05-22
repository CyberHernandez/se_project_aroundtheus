import { openModal, closeModal } from "../utils/utils.js";

export default class Card {
  constructor(cardData, cardSelector) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    //".card_like-button"
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLike();
      });

    //".card__delete-button"
    this._element
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDelete();
      });

    //Preview Picture
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewPicture();
      });
  }

  _handleLike() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-active");
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  _handlePreviewPicture() {
    const imageModal = document.querySelector("#image-modal");
    const imageModalElement = document.querySelector(".modal__image");
    const imageModalCaption = document.querySelector(".modal__caption");

    this._element.addEventListener("click", () => {
      imageModalElement.src = this.link;
      imageModalCaption.alt = this.name;
      imageModalCaption.textContent = this.name;
      openModal(imageModal);
    });
  }

  generateCard() {
    //copy template
    this._element = this._getTemplate();
    //fill template
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__title").textContent = this._name;
    //set event listeners
    this._setEventListeners();

    return this._element;
  }
}
