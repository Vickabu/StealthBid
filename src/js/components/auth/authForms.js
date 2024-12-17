import { onLogin } from "../../ui/auth/login";
import { onRegister } from "../../ui/auth/register";
import { formStyles } from "../../utils/styles";

/**
 * Creates the Login and Register forms dynamically in the DOM.
 *
 * This function generates two forms: one for login and another for user registration.
 * Each form is populated with fields, such as email, password, and name, and has an associated submit button.
 * The function also attaches event listeners for form submissions and includes error message containers for form validation feedback.
 *
 * The login form is displayed by default, while the register form is initially hidden, and can be toggled (presumably) by the UI.
 *
 * @function
 * @returns {HTMLElement} The container element that holds both the login and registration forms.
 *
 * @example
 * // Example usage:
 * const authForms = createAuthForms();
 * document.getElementById('some-container').appendChild(authForms);
 */

export function createAuthForms() {
  const formsContainer = document.createElement("div");
  formsContainer.id = "auth-forms";
  formsContainer.classList.add(...formStyles.container);

  // Create login form
  const loginForm = document.createElement("form");
  loginForm.id = "login-form";
  loginForm.classList.add(...formStyles.signInform);

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
  loginSubmitButton.classList.add(...formStyles.loginButton);
  loginSubmitButton.textContent = "Login";
  loginForm.appendChild(loginSubmitButton);

  loginForm.addEventListener("submit", onLogin);

  // Create register form
  const registerForm = document.createElement("form");
  registerForm.id = "register-form";
  registerForm.classList.add(...formStyles.signInform, "hidden");

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

    const errorDiv = document.createElement("div");
    errorDiv.id = `${field.id}-error`;
    errorDiv.classList.add(...formStyles.errorMessage);
    registerForm.appendChild(errorDiv);
  });

  const registerSubmitButton = document.createElement("button");
  registerSubmitButton.type = "submit";
  registerSubmitButton.classList.add(...formStyles.loginButton);
  registerSubmitButton.textContent = "Register";
  registerForm.appendChild(registerSubmitButton);

  registerForm.addEventListener("submit", onRegister);

  formsContainer.append(loginForm, registerForm);
  return formsContainer;
}
