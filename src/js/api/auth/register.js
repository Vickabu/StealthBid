import { API_AUTH_REGISTER } from "../constant";
import { headers } from "../headers";

/**
 * Registers a new user by sending a POST request to the registration API endpoint.
 *
 * This function sends the `name`, `email`, and `password` to the registration API. If the registration is successful, it does not return any value.
 * In case of an error (e.g., invalid data or server issues), it throws an error and displays an error message to the user using `window.toastr`.
 *
 * @async
 * @function
 * @param {Object} params - The user registration details.
 * @param {string} params.name - The user's name.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's password.
 * @throws {Error} Throws an error if the registration fails due to invalid data or a network issue.
 *
 * @example
 * try {
 *   await register({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
 * } catch (error) {
 *   console.error('Registration failed', error);
 * }
 */

export async function register({ name, email, password }) {
  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const { errors } = await response.json();
      const errorMessage =
        errors && errors.length > 0 ? errors[0].message : "Unknown error";

      window.toastr.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}
