import { API_AUTH_LOGIN } from "../constant";
import { headers } from "../headers";

/**
 * Logs in a user via POST request.
 *
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @returns {Promise<Object>} Authenticated user data
 * @throws {Error} If credentials are invalid or request fails
 */
export async function login({ email, password }) {
  try {
    const res = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const body = await res.json();

    if (!res.ok) {
      const msg =
        body?.errors?.[0]?.message || "Login failed with unknown error";
      throw new Error(msg);
    }

    const { accessToken, name, bio, avatar, banner } = body.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ name, email, bio, avatar, banner }),
    );
    localStorage.setItem("isLoggedIn", "true");

    return body.data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong during login");
  }
}
