const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
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
const cardAddForm = cardAddModal.querySelector("#add-card-form");

const cardTitleInput = cardAddModal.querySelector("#card-title-input");
const cardLinkInput = cardAddModal.querySelector("#link-input");

const imageModal = document.querySelector("#image-modal");
const imageModalEl = document.querySelector(".modal__image");
const imageModalCaption = document.querySelector(".modal__caption");
/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
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
  const imageModal = cardEl.querySelector(".card__image");

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
    modalImageEl.src = cardData.link;
    imageModalCaption.textContent = cardData.name;
    openModal(imageModal);
  });

  return cardEl;
}

function renderCard(cardEl, container) {
  container.prepend(cardEl);
}
/* -------------------------------------------------------------------------- */
/*                               EVENT HANDLERS                               */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handlecardAddSubmit(e) {
  e.preventDefault();
  renderCard(
    {
      name: cardTitleInput.value,
      link: cardLinkInput.value,
    },
    cardListEl
  );
  closeModal(cardAddModal);
}
/*
const handleImageModal = (cardData) => {
  imageEl.src = cardData.link;
  imageEl.alt = ${cardData.name};
  imageCaption.textContent = cardData.name;
  openModal(imageModal);
};
/* -------------------------------------------------------------------------- */
/*                               EVENT LISTENERS                              */
/* -------------------------------------------------------------------------- */
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openModal(profileEditModal);
});

editCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardAddButton.addEventListener("click", () => {
  openModal(cardAddModal);
});

cardAddCloseButton.addEventListener("click", () => {
  closeModal(cardAddModal);
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
});
