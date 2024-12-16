import { API_AUCTION_PROFILES } from "../constant";
import { headers } from "../headers";

/**
 * Fetches the profile data of a specific user by their profile name.
 *
 * @param {string} name - The profile name of the user whose data is being fetched.
 * @returns {Object} - Returns the profile data of the user, or throws an error if the fetch fails.
 *
 * @throws {Error} - Throws an error if the API request fails or the response is not OK.
 *
 * @example
 * const profile = await readProfile("john_doe");
 * console.log(profile);
 */

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
