import { fetchListings } from "../../api/listings/read";
import { createListingCard } from "../../utils/listingCard";

let currentPage = 1;
const itemsPerPage = 12;

export async function fetchAndDisplayListings() {
  try {
    const listings = await fetchListings(currentPage, itemsPerPage);

    console.log("Fetched Listings:", listings);

    listings.sort((a, b) => {
      const timeRemainingA = calculateTimeRemaining(a.endsAt);
      const timeRemainingB = calculateTimeRemaining(b.endsAt);

      const timeA =
        timeRemainingA === "Expired"
          ? Infinity
          : parseTimeToMinutes(timeRemainingA);
      const timeB =
        timeRemainingB === "Expired"
          ? Infinity
          : parseTimeToMinutes(timeRemainingB);

      return timeA - timeB;
    });

    console.log("Active Listings after sorting:", listings);

    if (listings.length === 0) {
      console.warn("No active listings found!");
    }

    const listingsContainer = document.getElementById("listings-container");
    listingsContainer.innerHTML = "";

    listings.forEach((listing) => {
      const listingCard = createListingCard(listing);
      listingsContainer.appendChild(listingCard);
    });

    displayPagination();
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
}

function calculateTimeRemaining(endsAt) {
  const now = new Date();
  const endDate = new Date(endsAt);
  const timeRemaining = endDate - now;

  if (timeRemaining <= 0) {
    return "Expired";
  }

  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

function parseTimeToMinutes(time) {
  const match = time.match(/(\d+)h (\d+)m/);
  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    return hours * 60 + minutes;
  }
  return Infinity;
}

function displayPagination() {
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchAndDisplayListings();
    }
  });

  paginationContainer.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", () => {
    currentPage++;
    fetchAndDisplayListings();
  });

  paginationContainer.appendChild(nextButton);
}

fetchAndDisplayListings();
