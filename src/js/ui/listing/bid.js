import { bidListing } from "../../api/listings/bid";

export async function onBidListing(listingId, bidAmount) {
  try {
    if (!listingId || !bidAmount || bidAmount <= 0) {
      throw new Error("Invalid listing ID or bid amount.");
    }

    const result = await bidListing(listingId, bidAmount);
    console.log("Bid placed successfully:", result);
    return result;
  } catch (error) {
    console.error("Error in onBidListing:", error);
    throw new Error("Failed to place bid. Please try again.");
  }
}
