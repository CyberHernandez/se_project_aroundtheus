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
const editCloseButton = document.querySelector("#edit-close-button");
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

const imageModal = document.querySelector("#image-modal");
const imageModalEl = document.querySelector(".modal__image");
const imageModalCaption = document.querySelector(".modal__caption");
const imageModalCloseButton = document.querySelector("#image-close-button");

const modals = document.querySelectorAll(".modal");
/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(e, modal) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

initialCards.forEach(function (cardData) {
  const cardView = getCard(cardData);
  renderCard(cardView, cardListEl);
});

function getCard(cardData) {
  const cardEl = cardTemplate.cloneNode(true);
  const imageEl = cardEl.querySelector(".card__image");
  const cardTitle = cardEl.querySelector(".card__title");
  const likeButton = cardEl.querySelector(".card__like-button");
  const deleteButton = cardEl.querySelector(".card__trash-button");

  imageEl.src = cardData.link;
  imageEl.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-active");
  });

  deleteButton.addEventListener("click", () => {
    cardEl.remove();
  });

  imageEl.addEventListener("click", () => {
    imageModalEl.src = cardData.link;
    imageModalEl.alt = cardData.name;
    imageModalCaption.textContent = cardData.name;
    openModal(imageModal);
  });

  return cardEl;
}

function renderCard(cardEl, container) {
  container.prepend(cardEl);
}

modals.forEach((modalElement) => {
  modalElement.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close-button")
    ) {
      closeModal(modalElement);
    }
  });
});
/* -------------------------------------------------------------------------- */
/*                               EVENT HANDLERS                               */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

/* -------------------------------------------------------------------------- */
/*                               EVENT LISTENERS                              */
/* -------------------------------------------------------------------------- */
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardAddButton.addEventListener("click", () => {
  openModal(cardAddModal);
  console.log(cardAddForm);
});

cardAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardView = getCard({
    name,
    link,
  });

  renderCard(cardView, cardListEl);
  closeModal(cardAddModal);
  const inputElements = cardAddModal.querySelectorAll(
    configuration.inputSelector
  );
  const submitButton = cardAddModal.querySelector(
    configuration.submitButtonSelector
  );
  e.target.reset();
  toggleButtonState(inputElements, submitButton, configuration);
});
