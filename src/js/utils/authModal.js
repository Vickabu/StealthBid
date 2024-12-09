import { modalStyles } from "./styles";
import { createAuthForms } from "./authForms";
import { createAuthTabs } from "./authTabs";

/**
 * Creates the authentication modal, including Login and Register forms.
 *
 * @returns {HTMLElement} The modal element.
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

  // modal.addEventListener("click", (event) => {
  //   if (event.target === modal) {
  //     modal.classList.add("hidden");
  //   }
  // });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modal.classList.add("hidden");
    }
  });

  return modal;
}
