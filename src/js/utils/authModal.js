import { modalStyles } from "./styles";
import { createAuthForms } from "./authForms";
import { createAuthTabs } from "./authTabs";

/**
 * Opens the authentication modal by removing the "hidden" class.
 *
 * This function makes the modal with the ID "auth-popup" visible by removing the "hidden" class.
 *
 * @function
 * @example
 * // Example usage:
 * openAuthModal(); // Opens the modal
 */

export function openAuthModal() {
  const modal = document.getElementById("auth-popup");
  modal.classList.remove("hidden");
}

/**
 * Creates the authentication modal, including Login and Register forms and tabs.
 *
 * This function constructs the modal with a header, logo, close button, authentication tabs, and the forms for login and registration.
 * It appends all necessary elements together and adds event listeners to handle closing the modal when clicking outside of it or pressing the Escape key.
 *
 * @function
 * @returns {HTMLElement} The modal element with forms and tabs.
 *
 * @example
 * // Example usage:
 * const authModal = createAuthModal();
 * document.body.appendChild(authModal); // Adds the modal to the body
 */

export function createAuthModal() {
  const modal = document.createElement("div");
  modal.id = "auth-popup";
  modal.classList.add(...modalStyles.overlay, "hidden");

  const modalContainer = document.createElement("div");
  modalContainer.classList.add(...modalStyles.container);

  const header = document.createElement("div");
  header.classList.add(...modalStyles.header);

  const logo = document.createElement("img");
  logo.src = "/DarkLogoBGF.png";
  logo.alt = "Logo";
  logo.classList.add(...modalStyles.logo);

  const closeButton = document.createElement("button");
  closeButton.id = "close-popup";
  closeButton.textContent = "×";
  closeButton.classList.add(...modalStyles.closeButton);

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  header.append(logo, closeButton);

  const tabs = createAuthTabs();
  const forms = createAuthForms();

  modalContainer.append(header, tabs, forms);
  modal.appendChild(modalContainer);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modal.classList.add("hidden");
    }
  });

  return modal;
}
