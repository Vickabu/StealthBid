import { API_AUCTION_PROFILES } from "../constant";
import { headers } from "../headers";

export async function readProfile(name) {
  try {
    const response = await fetch(`${API_AUCTION_PROFILES}/${name}`, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile data: ${response.status}`);
    }

    const profileData = await response.json();
    return profileData;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
}

// export async function readProfile() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const username = urlParams.get("name");

//   try {
//     const response = await fetch(
//       `${API_AUCTION_PROFILES}/${username}/listings`,
//       {
//         method: "GET",
//         headers: headers(),
//       }
//     );

//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//       return data.data;
//     } else {
//       console.error("Failed to fetch listings:", response.status);
//     }
//   } catch (error) {
//     console.error("Error reading profile:", error);
//   }
// }

// export async function readProfile(name) {
//   try {
//     const response = await fetch(`${API_AUCTION_PROFILES}/${name}`, {
//       method: "GET",
//       headers: headers(),
//     });
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data)
//       return data.data;
//     } else {
//       console.error("Failed to fetch profile:", response.status);
//     }
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//   }
// }

// export async function readProfiles(limit = 12, page = 1) {
//   try {
//     const params = new URLSearchParams({
//       limit: limit.toString(),
//       page: page.toString(),
//     });

//     const response = await fetch(`${API_AUCTION_PROFILES}?${params}`, {
//       method: "GET",
//       headers: headers(),
//     });
//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     }
//   } catch (error) {
//     console.error("Error fetching profiles:", error);
//   }
// }
