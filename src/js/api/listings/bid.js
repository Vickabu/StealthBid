import { API_LISTINGS } from "../constant";
import { headers } from "../headers";

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

  console.log("Request URL:", url.toString());
  console.log("Request Options:", options);

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
