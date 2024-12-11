import { onLogin } from "../ui/auth/login";
import { onRegister } from "../ui/auth/register";
import { formStyles } from "./styles";

/**
 * Creates the Login and Register forms.
 *
 * @returns {HTMLElement} The forms container.
 */

export function createAuthForms() {
  const formsContainer = document.createElement("div");
  formsContainer.id = "auth-forms";
  formsContainer.classList.add(...formStyles.container);

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
