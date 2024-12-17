import { login } from "../../api/auth/login";
import { hideLoader, showLoader } from "../global/loader";
import { validateField } from "../../utils/validate";

/**
 * Handles the login form submission, validating input fields, and performing login.
 * Displays a loader during the process and redirects the user upon successful login.
 * Shows a toast message upon success or error.
 *
 * @async
 * @function onLogin
 * @param {Event} event - The form submission event.
 * @returns {void}
 * @throws {Error} If validation fails or login encounters an error.
 *   The error message will be passed through a toast notification (e.g., "Invalid email or password").
 *
 * @example
 * // Add an event listener to the login form
 * const loginForm = document.getElementById("login-form");
 * loginForm.addEventListener("submit", onLogin);
 */

export async function onLogin(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  showLoader();
  try {
    validateField(email, "email");
    validateField(password, "password");

    await login({
      email,
      password,
    });

    hideLoader();

    window.toastr.success("Login successful", "Welcome!");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    hideLoader();
    window.toastr.error(`Login failed: ${error.message}`, "Error");
  }
}
