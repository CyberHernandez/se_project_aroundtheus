export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", (e) => handleEscape(e, modal));
  document.addEventListener("click", handleOverlayClick);
}

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", (e) => handleEscape(e, modal));
  document.removeEventListener("click", handleOverlayClick);
}

function handleEscape(e, modal) {
  if (e.key === "Escape") {
    closeModal(modal);
  }
}

function handleOverlayClick(evt) {
  const openedModal = document.querySelector(".modal_opened");
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close-button")
  ) {
    closeModal(openedModal);
  }
}
