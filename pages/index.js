import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal } from "../utils/utils.js";

const initialCards = [
  {
    name: "Sean Thomas",
    link: "https://images.unsplash.com/photo-1577493340887-b7bfff550145?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=340&q=80",
  },
  {
    name: "Brian Matangelo",
    link: "https://images.unsplash.com/photo-1600965962102-9d260a71890d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "Solen Feyissa",
    link: "https://images.unsplash.com/photo-1621423028742-e6f7256405d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "Tetiana Grypachevska",
    link: "https://images.unsplash.com/photo-1619266465172-02a857c3556d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80",
  },
  {
    name: "Yosh Ginsu",
    link: "https://images.unsplash.com/photo-1475776408506-9a5371e7a068?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=758&q=80",
  },

  {
    name: "Zdeněk Macháček",
    link: "https://images.unsplash.com/photo-1552726516-8e582c6ec1f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=755&q=80",
  },
];
/* -------------------------------------------------------------------------- */
/*                                  ELEMENTS                                  */
/* -------------------------------------------------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = document.querySelector("#edit-close-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardAddButton = document.querySelector("#add-button");
const cardAddModal = document.querySelector("#add-modal");
const cardAddCloseButton = document.querySelector("#add-close-button");
const cardAddSaveButton = document.querySelector("#add-save-button");
const cardAddForm = cardAddModal.querySelector("#add-card-form");

const cardTitleInput = cardAddModal.querySelector("#card-title-input");
const cardLinkInput = cardAddModal.querySelector("#link-input");

const modals = document.querySelectorAll(".modal");
const editFormModal = document.querySelector("#profile-form");
const cardFormModal = document.querySelector("#add-card-form");
/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
function createCard(cardData) {
  const card = new Card(cardData, "#card-template");
  return card.generateCard();
}

initialCards.forEach(function (cardData) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
});
/* -------------------------------------------------------------------------- */
/*                               Profile                                      */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/* -------------------------------------------------------------------------- */
/*                               Add Card                                     */
/* -------------------------------------------------------------------------- */

cardAddButton.addEventListener("click", () => {
  cardFormValidator.disableButton();
  openModal(cardAddModal);
  console.log(cardAddForm);
});

cardAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardElement = createCard({
    name,
    link,
  });

  cardListEl.prepend(cardElement);
  closeModal(cardAddModal);
  cardFormValidator.toggleButtonState();
  e.target.reset();
});

const configuration = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  cardTemplate: "#card-template",
};
/* -------------------------------------------------------------------------- */
/*                                  Validation                                */
/* -------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(configuration, editFormModal);
const cardFormValidator = new FormValidator(configuration, cardFormModal);

editFormValidator.enableValidation(configuration);
cardFormValidator.enableValidation(configuration);
