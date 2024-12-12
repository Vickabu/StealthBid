import { createListingCard } from "./createListingsCard";
import { hideLoader, showLoader } from "./loader";
import { displayPagination } from "./pagination";
import { showSearchTag } from "./searchTag";
import { fetchListingsData } from "./handleFetchListings";

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

export async function displayListings(
  query = "",
  sortOption = "time-low-high",
) {
  try {
    const { sort, sortOrder } = getSortOptions(sortOption);
    let listings = await fetchListingsData(query, 100, sort, sortOrder);
    console.log("Fetched Listings:", listings);

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
