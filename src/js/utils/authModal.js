import { onLogin } from "../api/auth/login";
import { onRegister } from "../api/auth/register";
import { modalStyles, tabStyles, formStyles } from "./styles";

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

/**
 * Creates tab buttons for switching between Login and Register forms.
 *
 * @returns {HTMLElement} The tabs container.
 */

function createAuthTabs() {
  const tabs = document.createElement("div");
  tabs.classList.add(...tabStyles.container);

  const loginTab = document.createElement("button");
  loginTab.id = "login-tab";
  loginTab.textContent = "Login";
  loginTab.classList.add(...tabStyles.tab);

  const registerTab = document.createElement("button");
  registerTab.id = "register-tab";
  registerTab.textContent = "Register";
  registerTab.classList.add(...tabStyles.tab);

  loginTab.addEventListener("click", () => {
    document.getElementById("login-form").classList.remove("hidden");
    document.getElementById("register-form").classList.add("hidden");
    loginTab.classList.add(...tabStyles.activeTab);
    registerTab.classList.remove(...tabStyles.activeTab);
  });

  registerTab.addEventListener("click", () => {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("register-form").classList.remove("hidden");
    registerTab.classList.add(...tabStyles.activeTab);
    loginTab.classList.remove(...tabStyles.activeTab);
  });

  tabs.append(loginTab, registerTab);
  return tabs;
}

/**
 * Creates the Login and Register forms.
 *
 * @returns {HTMLElement} The forms container.
 */

function createAuthForms() {
  const formsContainer = document.createElement("div");
  formsContainer.id = "auth-forms";
  formsContainer.classList.add(...formStyles.container);

  const loginForm = document.createElement("form");
  loginForm.id = "login-form";
  loginForm.classList.add(...formStyles.form);

  const loginFields = [
    { type: "email", placeholder: "Email", id: "login-email", required: true },
    {
      type: "password",
      placeholder: "Password",
      id: "login-password",
      required: true,
    },
  ];

  loginFields.forEach((field) => {
    const input = document.createElement("input");
    input.type = field.type;
    input.placeholder = field.placeholder;
    input.id = field.id;
    input.required = field.required;
    input.classList.add(...formStyles.input);
    loginForm.appendChild(input);
  });

  const loginSubmitButton = document.createElement("button");
  loginSubmitButton.type = "submit";
  loginSubmitButton.classList.add(...formStyles.submitButton);
  loginSubmitButton.textContent = "Login";
  loginForm.appendChild(loginSubmitButton);

  loginForm.addEventListener("submit", onLogin);

  const registerForm = document.createElement("form");
  registerForm.id = "register-form";
  registerForm.classList.add(...formStyles.form, "hidden");

  const registerFields = [
    { type: "text", placeholder: "Name", id: "register-name", required: true },
    {
      type: "email",
      placeholder: "Email",
      id: "register-email",
      required: true,
    },
    {
      type: "password",
      placeholder: "Password",
      id: "register-password",
      required: true,
    },
    {
      type: "password",
      placeholder: "Repeat Password",
      id: "register-password-repeat",
      required: true,
    },
  ];

  registerFields.forEach((field) => {
    const input = document.createElement("input");
    input.type = field.type;
    input.placeholder = field.placeholder;
    input.id = field.id;
    input.required = field.required;
    input.classList.add(...formStyles.input);
    registerForm.appendChild(input);
  });

  const registerSubmitButton = document.createElement("button");
  registerSubmitButton.type = "submit";
  registerSubmitButton.classList.add(...formStyles.submitButton);
  registerSubmitButton.textContent = "Register";
  registerForm.appendChild(registerSubmitButton);

  registerForm.addEventListener("submit", onRegister);

  formsContainer.append(loginForm, registerForm);
  return formsContainer;
}
