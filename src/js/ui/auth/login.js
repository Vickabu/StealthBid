import { login } from "../../api/auth/login";
import { hideLoader, showLoader } from "../global/loader";
import { validateField } from "../../utils/validate";

/**
 * Handles login form submission.
 *
 * @param {Event} event
 */
export async function onLogin(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  try {
    showLoader();

    const emailError = validateField(email, "email");
    const passwordError = validateField(password, "password");

    if (emailError || passwordError) {
      if (emailError) {
        document.getElementById("login-email-error").innerText = emailError;
      }
      if (passwordError) {
        document.getElementById("login-password-error").innerText =
          passwordError;
      }
      throw new Error("Validation failed");
    }

    await login({ email, password });

    window.toastr.success("Login successful", "Welcome!");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    if (error.message !== "Validation failed") {
      window.toastr.error(`Login failed: ${error.message}`, "Error");
    }
  } finally {
    hideLoader();
  }
}
