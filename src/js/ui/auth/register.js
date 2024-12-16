import { register } from "../../api/auth/register";
import { hideLoader, showLoader } from "../../utils/loader";
import { validateField } from "../../utils/validate";

/**
 * Handles the registration process for a new user.
 *
 * This function is triggered when the registration form is submitted.
 * It collects the form values, validates the input fields, and calls the `register` API function to create a new user account.
 * If validation fails, it displays error messages next to the respective form fields.
 * - On success, it shows a success message and navigates the user to the login page.
 * - On failure, it displays an error message.
 *
 * @async
 * @function
 * @param {Event} event - The submit event that triggers the registration process.
 *
 * @example
 * // Example usage:
 * document.getElementById('register-form').addEventListener('submit', onRegister);
 *
 * @throws {Error} Throws an error if the registration process fails due to invalid input or API issues.
 */

export async function onRegister(event) {
  event.preventDefault();

  const name = document.getElementById("register-name").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const confirmPassword = document
    .getElementById("register-password-repeat")
    .value.trim();

  const fields = [
    { id: "register-name", value: name, type: "name" },
    { id: "register-email", value: email, type: "email" },
    { id: "register-password", value: password, type: "password" },
    {
      id: "register-password-repeat",
      value: confirmPassword,
      type: "confirmPassword",
      referenceValue: password,
    },
  ];

  let validationError = false;

  fields.forEach((field) => {
    const fieldElement = document.getElementById(field.id);
    const errorMessageElement = document.getElementById(`${field.id}-error`);
    if (errorMessageElement) {
      errorMessageElement.innerText = "";
    }
    fieldElement.classList.remove("error");
  });

  showLoader();

  for (const field of fields) {
    const errorMessage = validateField(
      field.value,
      field.type,
      field.referenceValue,
    );
    if (errorMessage) {
      document.getElementById(`${field.id}-error`).innerText = errorMessage;
      document.getElementById(field.id).classList.add("error");
      validationError = true;
    }
  }

  if (validationError) {
    hideLoader();
    return;
  }

  try {
    await register({ name, email, password });
    hideLoader();

    window.toastr.success("Registration successful, please log in!");
    document.getElementById("login-tab").click();
  } catch (error) {
    console.error("Registration failed:", error);
    if (error.message !== "Validation Error") {
      window.toastr.error(error.message);
    }
    hideLoader();
  }
}
