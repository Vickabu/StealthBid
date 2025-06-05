import { API_AUTH_REGISTER } from "../constant";
import { headers } from "../headers";

/**
 * Registers a new user via POST request.
 *
 * @param {Object} user - User data
 * @param {string} user.name
 * @param {string} user.email
 * @param {string} user.password
 * @returns {Promise<void>}
 * @throws {Error} If registration fails
 */
export async function register({ name, email, password }) {
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
    throw new Error(errorMessage);
  }
}
