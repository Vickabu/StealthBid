import { API_AUTH_LOGIN } from "../constant";
import { headers } from "../headers";

/**
 * Logs in a user by sending their credentials to the API.
 * If successful, stores the user's access token and profile information in localStorage.
 * If the login fails, an error with a specific message is thrown (e.g., invalid email or password).
 *
 * @async
 * @function login
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} Resolves with the user data object if login is successful.
 * @throws {Error} If the API call fails or the credentials are invalid. The error message will contain details (e.g., "Invalid email or password").
 *
 * @example
 * try {
 *   const userData = await login({ email: "user@example.com", password: "securePassword123" });
 *   console.log("Login successful:", userData);
 * } catch (error) {
 *   console.error("Login failed:", error.message); // Shows specific error message like "Invalid email or password"
 * }
 */

export async function login({ email, password }) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const { errors } = await response.json();
      const errorMessage =
        errors && errors.length > 0 ? errors[0].message : "Unknown error";
      throw new Error(errorMessage);
    }

    const { data } = await response.json();
    const { accessToken, name, bio, avatar, banner } = data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ name, email, bio, avatar, banner }),
    );
    localStorage.setItem("isLoggedIn", "true");

    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
