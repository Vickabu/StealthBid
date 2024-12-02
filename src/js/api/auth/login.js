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

export async function onLogin(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    await login({
      email,
      password,
    });
    window.location.href = "/";
  } catch (error) {
    alert(`Login failed: ${error.message}`);
  }
}

// async function fetchProfileData() {
//   try {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       console.error("No access token found!");
//       return;
//     }

//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     const { name } = userInfo;

//     console.log("Fetching profile data for:", name);
//     const url = `${API_AUCTION_PROFILES}/${name}`;
//     console.log("API URL:", url);

//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     const responseData = await response.json();
//     console.log("Full API Response:", responseData);
//     if (!response.ok) {
//       const { message } = responseData;
//       if (response.status === 401) {
//         console.error("Unauthorized error: Token might be invalid or expired.");
//       }
//       throw new Error(message || "Failed to fetch profile data.");
//     }
//     const { data } = responseData;
//     if (!data) {
//       console.error("No profile data found in response.");
//       return;
//     }
//     console.log("Profile Data:", data);
//     localStorage.setItem("profileData", JSON.stringify(data));
//     console.log("Profile Data Stored:", localStorage.getItem("profileData"));
//   } catch (error) {
//     console.error("Failed to fetch profile data:", error);
//   }
// }
