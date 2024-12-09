import { register } from "../../api/auth/register";
import { validateField } from "../../utils/validate";

export async function onRegister(event) {
  event.preventDefault();

  const name = document.getElementById("register-name").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const confirmPassword = document
    .getElementById("register-password-repeat")
    .value.trim();

  if (!name || !email || !password) {
    console.error("All required fields must be filled out");
    return;
  }

  try {
    validateField(name, "name");
    validateField(email, "email");
    validateField(password, "password");
    validateField(confirmPassword, "confirmPassword", password);

    await register({ name, email, password });
  } catch (error) {
    console.error("Registration failed:", error);
    alert(`Validation Error: ${error.message}`);
  }
}
