import { API_AUCTION_PROFILES } from "../constant";
import { headers } from "../headers";

/**
 * Updates the profile data of a user.
 *
 * This function sends a PUT request to the API to update the profile information
 * of the specified user with the given `profileData`.
 *
 * @param {Object} profileData - The data to update the user's profile with.
 *                                 This object should contain the fields to be updated.
 * @param {string} userName - The username of the user whose profile is being updated.
 * @returns {Object} - Returns the updated profile data upon success.
 *
 * @throws {Error} - Throws an error if the API request fails or the response is not OK.
 *
 * @example
 * const updatedProfile = await updateProfile({ bio: "New bio text", age: 25 }, "john_doe");
 * console.log(updatedProfile);
 */

export async function updateProfile(profileData, userName) {
  try {
    const url = `${API_AUCTION_PROFILES}/${userName}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
