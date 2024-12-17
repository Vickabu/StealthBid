import { fetchListing } from "../../api/listings/read";
import { createListingDetailCard } from "../../components/listings/createListingCard";
import { hideLoader, showLoader } from "../../ui/global/loader";

/**
 * Displays the detailed page for a specific listing. The function retrieves the listing ID from the URL, fetches the listing data using the ID,
 * and then dynamically creates and displays the listing's details on the page. A loader is shown while the listing is being fetched,
 * and the loader is hidden once the data is displayed.
 *
 * @returns {void}
 */

export async function displayListingPage() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

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

displayListingPage();
