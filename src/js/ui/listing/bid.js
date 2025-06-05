import { bidListing } from "../../api/listings/bid";
import { hideLoader, showLoader } from "../global/loader";

/**
 * Handles placing a bid on a listing with validation and loader.
 *
 * @param {string} listingId - The listing ID to place a bid on.
 * @param {number} bidAmount - The bid amount (must be > 0).
 * @returns {Promise<Object>} Result of the bid.
 * @throws {Error} If validation or API call fails.
 */
export async function onBidListing(listingId, bidAmount) {
  if (typeof listingId !== "string" || listingId.trim() === "") {
    throw new Error("Listing ID is required.");
  }

  if (typeof bidAmount !== "number" || isNaN(bidAmount) || bidAmount <= 0) {
    throw new Error("Please enter a valid bid amount greater than 0.");
  }

  showLoader();

  try {
    const result = await bidListing(listingId, bidAmount);
    return result;
  } catch (error) {
    throw new Error(error.message || "Failed to place bid. Please try again.");
  } finally {
    hideLoader();
  }
}
