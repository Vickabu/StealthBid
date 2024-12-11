import { fetchListing } from "../../api/listings/read";
import { createListingDetailCard } from "../../utils/createListingCard";
import { hideLoader, showLoader } from "../../utils/loader";

export async function fetchAndDisplayListing() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    console.log("Fetching listing with ID:", id);
    if (!id) {
      throw new Error("No listing ID provided.");
    }

    showLoader();
    const listing = await fetchListing(id);
    if (!listing) {
      console.error("Listing not found or error occurred");
      return;
    }

    const listingContainer = document.getElementById("listing-container");
    const listingCard = createListingDetailCard(listing);
    listingContainer.innerHTML = "";
    listingContainer.appendChild(listingCard);
  } catch (error) {
    console.error("Error displaying listing:", error);
  } finally {
    hideLoader();
  }
}

fetchAndDisplayListing();
