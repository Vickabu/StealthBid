import { API_AUTH_REGISTER } from "../constant";
import { headers } from "../headers";

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
