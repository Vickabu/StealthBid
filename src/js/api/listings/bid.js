import { API_LISTINGS } from "../constant";
import { headers } from "../headers";

/**
 * Places a bid on a listing.
 *
 * @param {string} listingId - The unique identifier of the listing.
 * @param {number} bidAmount - The amount of the bid to place on the listing.
 * @returns {Promise<Object>} The details of the placed bid.
 * @throws {Error} If validation fails or the API responds with an error.
 */
export async function bidListing(listingId, bidAmount) {
  if (!listingId || typeof listingId !== "string" || listingId.trim() === "") {
    throw new Error("Listing ID is required.");
  }

  if (typeof bidAmount !== "number" || isNaN(bidAmount) || bidAmount <= 0) {
    throw new Error("Bid amount must be a positive number.");
  }

  const url = new URL(`${API_LISTINGS}/${listingId}/bids`);
  url.searchParams.append("_seller", true);
  url.searchParams.append("_bids", true);

  const body = { amount: bidAmount };

  try {
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(body),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage =
        responseData?.errors?.[0]?.message ||
        responseData?.message ||
        "Could not place bid. Please try again.";

      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error) {
    throw new Error(
      error.message || "Something went wrong while placing your bid.",
    );
  }
}
