import { createListingCard } from "./createListingsCard";
import { hideLoader, showLoader } from "../../ui/global/loader";
import { displayPagination } from "../../utils/pagination";
import { showSearchTag } from "../../utils/searchTag";
import { fetchListingsData } from "../../utils/handleFetchListings";

let currentPage = 1;
const itemsPerPage = 12;

document
  .getElementById("sort-dropdown")
  .addEventListener("change", async (event) => {
    const sortOption = event.target.value;
    const searchQuery = document.getElementById("search-bar").value.trim();
    const sortOrder = "asc";
    showLoader();
    await displayListings(searchQuery, sortOption, sortOrder);
  });

document
  .getElementById("search-bar")
  .addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      const query = event.target.value.trim();
      if (query) {
        showLoader();
        await displayListings(query);
        showSearchTag(query);
      }
    }
  });

/**
 * Fetches and displays a paginated list of listings, based on the provided search query and sorting option.
 * Displays the listings in the "listings-container" element and handles pagination.
 *
 * @async
 * @param {string} [query=""] - The search query to filter the listings (optional).
 * @param {string} [sortOption="time-low-high"] - The sorting option to determine the order of the listings (optional).
 *      Possible values: "newest", "oldest", "time-low-high", "time-high-low", "a-z", "z-a".
 *
 * @returns {void}
 */

export async function displayListings(
  query = "",
  sortOption = "time-low-high",
) {
  try {
    const { sort, sortOrder } = getSortOptions(sortOption);
    let listings = await fetchListingsData(query, 100, sort, sortOrder);

    const totalPages = Math.ceil(listings.length / itemsPerPage);
    const paginatedListings = listings.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );

    const listingsContainer = document.getElementById("listings-container");
    listingsContainer.innerHTML = "";

    paginatedListings.forEach((listing) => {
      const listingCard = createListingCard(listing);
      listingsContainer.appendChild(listingCard);
    });

    displayPagination(totalPages, currentPage, (page) => {
      currentPage = page;
      showLoader();
      displayListings(query, sortOption);
    });
  } catch (error) {
    console.error("Error fetching and displaying listings:", error);
  } finally {
    hideLoader(false);
  }
}

/**
 * Returns the sorting options (field and order) based on the provided sort option.
 *
 * @param {string} sortOption - The sorting option that determines how listings are sorted.
 *      Possible values: "newest", "oldest", "time-low-high", "time-high-low", "a-z", "z-a".
 *
 * @returns {Object} The sorting options containing:
 *      - {string} sort: The field by which to sort the listings.
 *      - {string} sortOrder: The order of the sorting, either "asc" or "desc".
 */

function getSortOptions(sortOption) {
  const sortOptionsMap = {
    newest: { sort: "created", sortOrder: "desc" },
    oldest: { sort: "created", sortOrder: "asc" },
    "time-low-high": { sort: "endsAt", sortOrder: "asc" },
    "time-high-low": { sort: "endsAt", sortOrder: "desc" },
    "a-z": { sort: "title", sortOrder: "asc" },
    "z-a": { sort: "title", sortOrder: "desc" },
  };

  return sortOptionsMap[sortOption] || { sort: "endsAt", sortOrder: "asc" };
}
