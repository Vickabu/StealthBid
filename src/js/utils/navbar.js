import { navbarStyles, modalStyles, tabStyles, formStyles } from "./styles";

/**
 * Creates a navbar with a login button and a global authentication modal.
 * The modal includes Login and Register forms and supports toggling between them.
 *
 * @example
 * createNavbarAndModal();
 * document.body.appendChild(navbar);
 */

export function createNavbarAndModal() {
  const navbar = createNavbar();
  const modal = createAuthModal();

  document.body.insertAdjacentElement("afterbegin", navbar);
  document.body.insertAdjacentElement("beforeend", modal);

  setupEventListeners();
}

/**
 * Creates the navbar element with a login button.
 *
 * @returns {HTMLElement} The navbar element.
 */

function createNavbar() {
  const navbar = document.createElement("nav");
  navbar.classList.add(...navbarStyles.container);

  const logo = document.createElement("img");
  logo.src = "/BrightLogo.png";
  logo.alt = "Logo";
  logo.classList.add(...navbarStyles.logo);

  const loginButton = document.createElement("button");
  loginButton.id = "auth-btn";
  loginButton.textContent = "Sign In";
  loginButton.classList.add(...navbarStyles.loginButton);

  navbar.append(logo, loginButton);
  return navbar;
}

/**
 * Creates the authentication modal, including Login and Register forms.
 *
 * @returns {HTMLElement} The modal element.
 */

function createAuthModal() {
  const modal = document.createElement("div");
  modal.id = "auth-popup";
  modal.classList.add(...modalStyles.overlay, "hidden"); // "hidden"

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

  header.append(logo, closeButton);

  const tabs = createAuthTabs();
  const forms = createAuthForms();

  modalContainer.append(header, tabs, forms);
  modal.appendChild(modalContainer);

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
  loginTab.classList.add(...tabStyles.tab, tabStyles.activeTab);

  const registerTab = document.createElement("button");
  registerTab.id = "register-tab";
  registerTab.textContent = "Register";
  registerTab.classList.add(...tabStyles.tab);

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

  loginForm.innerHTML = `
    <input type="email" placeholder="Email" class="${formStyles.input.join(" ")}" />
    <input type="password" placeholder="Password" class="${formStyles.input.join(" ")}" />
    <button type="submit" class="${formStyles.submitButton.join(" ")}">Login</button>
  `;

  const registerForm = document.createElement("form");
  registerForm.id = "register-form";
  registerForm.classList.add(...formStyles.form, "hidden");

  registerForm.innerHTML = `
    <input type="text" placeholder="Name" class="${formStyles.input.join(" ")}" />
    <input type="email" placeholder="Email" class="${formStyles.input.join(" ")}" />
    <input type="password" placeholder="Password" class="${formStyles.input.join(" ")}" />
    <input type="password" placeholder="Repeat Password" class="${formStyles.input.join(" ")}" />
    <button type="submit" class="${formStyles.submitButton.join(" ")}">Register</button>
  `;

  formsContainer.append(loginForm, registerForm);
  return formsContainer;
}

/**
 * Sets up event listeners for modal interactions.
 */

function setupEventListeners() {
  document
    .getElementById("open-login-register")
    .addEventListener("click", () => {
      document.getElementById("auth-popup").classList.remove("hidden");
    });

  document.getElementById("auth-btn").addEventListener("click", () => {
    document.getElementById("auth-popup").classList.remove("hidden");
  });

  document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("auth-popup").classList.add("hidden");
  });

  document.getElementById("auth-popup").addEventListener("click", (event) => {
    if (event.target === document.getElementById("auth-popup")) {
      document.getElementById("auth-popup").classList.add("hidden");
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.getElementById("auth-popup").classList.add("hidden");
    }
  });

  document.getElementById("login-tab").addEventListener("click", () => {
    document.getElementById("login-form").classList.remove("hidden");
    document.getElementById("register-form").classList.add("hidden");
    document.getElementById("login-tab").classList.add("text-blue-500");
    document.getElementById("register-tab").classList.remove("text-blue-500");
  });

  document.getElementById("register-tab").addEventListener("click", () => {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("register-form").classList.remove("hidden");
    document.getElementById("register-tab").classList.add("text-blue-500");
    document.getElementById("login-tab").classList.remove("text-blue-500");
  });
}

window.addEventListener("DOMContentLoaded", setupEventListeners);
