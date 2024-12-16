import { API_LISTINGS } from "../../api/constant";
import { headers } from "../../api/headers";

/**
 * Creates a new listing by sending a POST request to the API.
 *
 * @async
 * @param {Object} listingData - The data for the listing.
 * @param {string} listingData.title - The title of the listing.
 * @param {string} listingData.description - The description of the listing.
 * @param {string[]} [listingData.tags=[]] - Optional tags for the listing.
 * @param {Object[]} [listingData.media=[]] - Optional media for the listing.
 * @param {string} listingData.endsAt - The end date of the listing (ISO 8601).
 * @returns {Promise<Object>} The created listing data.
 * @throws {Error} If the API request fails.
 */

export async function createListing({
  title,
  description,
  tags = [],
  media = [],
  endsAt,
}) {
  try {
    const response = await fetch(API_LISTINGS, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ title, description, tags, media, endsAt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Response:", errorData);
      throw new Error(errorData.message || "An unknown error occurred.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
}
