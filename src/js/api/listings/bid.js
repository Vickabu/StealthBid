import { API_LISTINGS } from "../constant";
import { headers } from "../headers";

/**
 * Fetches a list of bids for a given listing.
 *
 * This function makes a GET request to the API to retrieve bids for a specific listing,
 * optionally filtered by the seller and bid status.
 *
 * @param {string} listingId - The unique identifier of the listing.
 * @param {boolean} [seller=false] - A flag to filter bids by seller (defaults to false).
 * @param {boolean} [bids=false] - A flag to include bids (defaults to false).
 *
 * @returns {Promise<Object>} A promise that resolves to the response data in JSON format.
 *
 * @throws {Error} If the fetch request fails or if the server responds with a non-OK status.
 */

export async function fetchBids(listingId, seller = false, bids = false) {
  const url = new URL(`${API_LISTINGS}/${listingId}/bids`);
  url.searchParams.append("_seller", seller);
  url.searchParams.append("_bids", bids);

  try {
    const response = await fetch(url, {
      method: "GET",
      ...headers(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch bids: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching bids:", error);
    throw error;
  }
}

/**
 * Places a bid on a listing.
 *
 * This function makes a POST request to the API to place a bid on a specific listing with the given bid amount.
 *
 * @param {string} listingId - The unique identifier of the listing.
 * @param {number} bidAmount - The amount of the bid to place on the listing.
 *
 * @returns {Promise<Object>} A promise that resolves to the response data in JSON format, which contains the details of the placed bid.
 *
 * @throws {Error} If the fetch request fails or if the server responds with a non-OK status.
 */

export async function bidListing(listingId, bidAmount) {
  const url = new URL(`${API_LISTINGS}/${listingId}/bids`);

  url.searchParams.append("_seller", true);
  url.searchParams.append("_bids", true);

  const body = { amount: bidAmount };

  const options = {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url.toString(), options);

    if (!response.ok) {
      console.error(`Response status: ${response.status}`);
      console.error(`Response text: ${await response.text()}`);
      throw new Error(`Failed to place bid: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error placing bid:", error);
    throw error;
  }
}
