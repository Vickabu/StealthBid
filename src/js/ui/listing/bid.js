import { bidListing } from "../../api/listings/bid";

/**
 * Handles the process of placing a bid on a listing.
 *
 * This function validates the listing ID and bid amount before calling the `bidListing` function to place the bid.
 * It throws an error if the validation fails or if the `bidListing` function fails.
 *
 * @param {string} listingId - The unique identifier of the listing on which the bid is placed.
 * @param {number} bidAmount - The amount of the bid to place on the listing. It must be greater than 0.
 *
 * @returns {Promise<Object>} A promise that resolves to the result of the `bidListing` function, containing the placed bid details.
 *
 * @throws {Error} Throws an error if the listing ID or bid amount is invalid, or if placing the bid fails.
 */

export async function onBidListing(listingId, bidAmount) {
  try {
    if (!listingId || !bidAmount || bidAmount <= 0) {
      throw new Error("Invalid listing ID or bid amount.");
    }

    const result = await bidListing(listingId, bidAmount);
    return result;
  } catch (error) {
    console.error("Error in onBidListing:", error);
    throw new Error("Failed to place bid. Please try again.");
  }
}
