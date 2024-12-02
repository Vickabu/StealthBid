import { API_AUTH_REGISTER } from "../constant";
import { headers } from "../headers";

/**
 * Registers a new user with the provided credentials.
 *
 * Sends a POST request to the API to register the user. If successful, the user is redirected to the login page.
 * Displays an alert if registration fails or an error occurs.
 *
 * @param {Object} user - The user information.
 * @param {string} user.name - The name of the user.
 * @param {string} user.email - The email of the user.
 * @param {string} user.password - The password for the user.
 *
 * @returns {Promise<void>} A promise that resolves when the registration process completes.
 *
 * @example
 * ```js
 * const user = { name: 'John Doe', email: 'john@example.com', password: 'secret123' };
 * register(user);
 * ```
 */

export async function register({ name, email, password }) {
  const body = {
    name,
    email,
    password,
  };

  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      alert("User registered successfully!");
      window.location.href = "/";
    } else {
      const errorData = await response.json();
      alert(`Registration failed: ${errorData.message || "Unknown error"}`);
    }
  } catch (error) {
    alert("An error occurred during registration.");
    console.error(error);
  }
}

export async function onRegister(event) {
  event.preventDefault();

  const name = document.getElementById("register-name").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();

  if (!name || !email || !password) {
    console.error("All required fields must be filled out");
    return;
  }

  try {
    await register({ name, email, password });
  } catch (error) {
    console.error("Registration failed:", error);
  }
}
