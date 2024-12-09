import { login } from "../../api/auth/login";
import { validateField } from "../../utils/validate";

export async function onLogin(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  try {
    validateField(email, "email");
    validateField(password, "password");
    await login({
      email,
      password,
    });
    window.location.href = "/";
  } catch (error) {
    alert(`Login failed: ${error.message}`);
  }
}
