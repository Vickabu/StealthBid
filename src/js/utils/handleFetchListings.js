import { fetchListings, fetchSearchListings } from "../api/listings/read";

/**
 * Fetches a list of listings based on search query or default settings.
 * @param {string} [query=""] - The search query to filter listings (optional).
 * @param {number} [limit=100] - The number of listings to fetch (optional).
 * @param {string} [sort="endsAt"] - The field by which to sort the listings (optional).
 * @param {string} [sortOrder="asc"] - The order in which to sort the listings ("asc" or "desc") (optional).
 * @returns {Promise<Array>} A promise that resolves to an array of listings.
 */

export async function fetchListingsData(
  query = "",
  limit = 100,
  sort = "endsAt",
  sortOrder = "asc",
) {
  if (query) {
    return fetchSearchListings(query, 1, limit, sort, sortOrder);
  } else {
    return fetchListings(1, limit, "", sort, sortOrder);
  }
}
