import { API_AUCTION_PROFILES } from "../constant";
import { headers } from "../headers";

export async function readProfile(name) {
  try {
    const response = await fetch(`${API_AUCTION_PROFILES}/${name}`, {
      method: "GET",
      headers: headers(),
    });
    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      console.error("Failed to fetch profile:", response.status);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

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
