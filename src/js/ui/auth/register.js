import { register } from "../../api/auth/register";
import { hideLoader, showLoader } from "../global/loader";
import { validateField } from "../../utils/validate";

function clearFieldErrors(fields) {
  fields.forEach(({ id }) => {
    const errorEl = document.getElementById(`${id}-error`);
    if (errorEl) errorEl.innerText = "";
    document.getElementById(id).classList.remove("error");
  });
}

function displayFieldError(id, message) {
  const errorEl = document.getElementById(`${id}-error`);
  if (errorEl) errorEl.innerText = message;
  document.getElementById(id).classList.add("error");
}

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

  clearFieldErrors(fields);
  showLoader();

  let hasValidationError = false;

  for (const field of fields) {
    const errorMessage = validateField(
      field.value,
      field.type,
      field.referenceValue,
    );
    if (errorMessage) {
      displayFieldError(field.id, errorMessage);
      hasValidationError = true;
    }
  }

  if (hasValidationError) {
    hideLoader();
    return;
  }

  try {
    await register({ name, email, password });
    window.toastr.success("Registration successful, please log in!");
    document.getElementById("login-tab").click();
  } catch (error) {
    console.error("Registration failed:", error);
    window.toastr.error(
      error.message || "Something went wrong during registration.",
    );
  } finally {
    hideLoader();
  }
}
