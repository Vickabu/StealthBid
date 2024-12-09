import { API_AUTH_LOGIN } from "../constant";
import { headers } from "../headers";

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
      const { message } = await response.json();
      throw new Error(message || "Unknown error");
    }

    const { data } = await response.json();
    const { accessToken, name, bio, avatar, banner } = data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ name, email, bio, avatar, banner })
    );
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
