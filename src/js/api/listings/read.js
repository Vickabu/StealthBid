import {
  API_LISTINGS,
  API_LISTINGS_SEARCH,
  API_AUCTION_PROFILES,
} from "../constant";
import { headers } from "../headers";

/**
 * Fetches a list of listings with optional filters and pagination.
 *
 * @param {number} [page=1] - The page number for pagination.
 * @param {number} [limit=12] - The number of listings per page.
 * @param {string} [tag=""] - Optional tag filter for listings.
 * @param {string} [sort="endsAt"] - The field to sort the listings by (e.g., "endsAt").
 * @param {string} [sortOrder="asc"] - The sort order, either "asc" or "desc".
 * @param {boolean} [active=true] - Whether to fetch active listings or not.
 * @returns {Array} - Returns an array of listings or an empty array if the request fails.
 *
 * @example
 * const listings = await fetchListings(1, 12, "tech", "endsAt", "asc", true);
 */

export async function fetchListings(
  page = 1,
  limit = 12,
  tag = "",
  sort = "endsAt",
  sortOrder = "asc",
  active = true,
) {
  try {
    const url = new URL(API_LISTINGS);
    url.searchParams.append("_seller", "true");
    url.searchParams.append("_bids", "true");
    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);
    url.searchParams.append("tag", tag);
    url.searchParams.append("sort", sort);
    url.searchParams.append("sortOrder", sortOrder);
    url.searchParams.append("_active", active ? "true" : "false");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}

/**
 * Fetches listings based on a search query with optional filters and pagination.
 *
 * @param {string} query - The search query string.
 * @param {number} [page=1] - The page number for pagination.
 * @param {number} [limit=12] - The number of listings per page.
 * @param {string} [sort="endsAt"] - The field to sort the listings by (e.g., "endsAt").
 * @param {string} [sortOrder="asc"] - The sort order, either "asc" or "desc".
 * @returns {Array} - Returns an array of search result listings or an empty array if the request fails.
 *
 * @example
 * const searchResults = await fetchSearchListings("laptop", 1, 12, "price", "desc");
 */

export async function fetchSearchListings(
  query,
  page = 1,
  limit = 12,
  sort = "endsAt",
  sortOrder = "asc",
) {
  try {
    const url = new URL(API_LISTINGS_SEARCH);
    url.searchParams.append("sort", sort);
    url.searchParams.append("sortOrder", sortOrder);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);
    url.searchParams.append("q", encodeURIComponent(query));
    url.searchParams.append("_seller", "true");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}

/**
 * Fetches details of a specific listing by its ID.
 *
 * @param {string} id - The ID of the listing to fetch.
 * @returns {Object|null} - Returns the listing data or `null` if the request fails.
 *
 * @example
 * const listing = await fetchListing("12345");
 */

export async function fetchListing(id) {
  try {
    const url = new URL(`${API_LISTINGS}/${id}`);
    url.searchParams.append("_seller", "true");
    url.searchParams.append("_bids", "true");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching listing:", error);
    return null;
  }
}

/**
 * Fetches a list of listings by a specific user's profile name.
 *
 * @param {string} name - The user's profile name.
 * @returns {Array} - Returns an array of the user's listings or an empty array if the request fails.
 *
 * @example
 * const userListings = await fetchUserListings("john_doe");
 */

export async function fetchUserListings(name) {
  try {
    const response = await fetch(`${API_AUCTION_PROFILES}/${name}/listings`, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user listings: ${response.status}`);
    }

    const listingsData = await response.json();
    console.log(listingsData);
    return listingsData;
  } catch (error) {
    console.error("Error fetching user listings:", error);
    throw error;
  }
}
