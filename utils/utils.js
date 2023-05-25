function handleEscape(e) {
  console.log(e);
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    console.log(modal);
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

export function openModal(modal) {
  modal.classList.add("modal_opened");
  console.log(modal);
  modal.addEventListener("keyup", handleEscape);
  modal.addEventListener("mousedown", handleOverlayClick);
}

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("keyup", handleEscape);
  modal.removeEventListener("mousedown", handleOverlayClick);
}
