import { fetchListings, fetchSearchListings } from "../../api/listings/read";
import { createListingCard } from "../../utils/createListingsCard";

let currentPage = 1;
const itemsPerPage = 12;

document.getElementById("sort-dropdown").addEventListener("change", (event) => {
  const sortOption = event.target.value;
  const searchQuery = document.getElementById("search-bar").value.trim();
  const sortOrder = "asc";

  fetchAndDisplayListings(searchQuery, sortOption, sortOrder);
});

document
  .getElementById("search-bar")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const query = event.target.value.trim();
      if (query) {
        fetchAndDisplayListings(query);
        showSearchTag(query);
      }
    }
  });

function showSearchTag(query) {
  const searchTagContainer = document.getElementById("search-tag-container");
  searchTagContainer.innerHTML = "";
  searchTagContainer.classList.add(
    "justify-between",
    "bg-red-500",
    "rounded-sm",
    "px-3",
    "py-2",
    "flex"
  );

  const searchTag = document.createElement("div");
  searchTag.classList.add("font-bold");
  searchTag.textContent = `${query}`;

  const removeTagButton = document.createElement("button");
  removeTagButton.textContent = "×";
  removeTagButton.classList.add("pr-2");
  removeTagButton.onclick = () => {
    searchTagContainer.innerHTML = "";
    document.getElementById("search-bar").value = "";
    fetchAndDisplayListings();
  };
  searchTagContainer.append(removeTagButton, searchTag);
}

const sortOptionsMap = {
  newest: { sort: "created", sortOrder: "desc" },
  oldest: { sort: "created", sortOrder: "asc" },
  "time-low-high": { sort: "endsAt", sortOrder: "asc" },
  "time-high-low": { sort: "endsAt", sortOrder: "desc" },
  "a-z": { sort: "title", sortOrder: "asc" },
  "z-a": { sort: "title", sortOrder: "desc" },
};

export async function fetchAndDisplayListings(
  query = "",
  sortOption = "time-low-high"
) {
  try {
    const { sort, sortOrder } = sortOptionsMap[sortOption] || {};
    if (!sort || !sortOrder) {
      throw new Error(`Invalid sort option: ${sortOption}`);
    }

    let listings = [];
    if (query) {
      listings = await fetchSearchListings(query, 1, 100, sort, sortOrder);
    } else {
      listings = await fetchAllListingsData(100, sort, sortOrder);
    }

    console.log("API Call Details:", { query, sort, sortOrder });
    console.log("Fetched Listings:", listings);

    const totalPages = Math.ceil(listings.length / itemsPerPage);

    const paginatedListings = listings.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const listingsContainer = document.getElementById("listings-container");
    listingsContainer.innerHTML = "";

    paginatedListings.forEach((listing) => {
      const listingCard = createListingCard(listing);
      listingsContainer.appendChild(listingCard);
    });

    displayPagination(totalPages);
  } catch (error) {
    console.error("Error fetching and displaying listings:", error);
  }
}

function displayPagination(totalPages) {
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.onclick = () => {
      currentPage = i;
      fetchAndDisplayListings();
    };
    paginationContainer.appendChild(button);
  }
}

async function fetchAllListingsData(
  limit = 100,
  sort = "endsAt",
  sortOrder = "asc"
) {
  return fetchListings(1, limit, "", sort, sortOrder);
}
// export async function fetchAndDisplayListings() {
//   try {
//     const listings = await fetchListings(currentPage, itemsPerPage);

//     console.log("Fetched Listings:", listings);

//     listings.sort((a, b) => {
//       const timeRemainingA = calculateTimeRemaining(a.endsAt);
//       const timeRemainingB = calculateTimeRemaining(b.endsAt);

//       const timeA =
//         timeRemainingA === "Expired"
//           ? Infinity
//           : parseTimeToMinutes(timeRemainingA);
//       const timeB =
//         timeRemainingB === "Expired"
//           ? Infinity
//           : parseTimeToMinutes(timeRemainingB);

//       return timeA - timeB;
//     });

//     console.log("Active Listings after sorting:", listings);

//     if (listings.length === 0) {
//       console.warn("No active listings found!");
//     }

//     const listingsContainer = document.getElementById("listings-container");
//     listingsContainer.innerHTML = "";

//     listings.forEach((listing) => {
//       const listingCard = createListingCard(listing);
//       listingsContainer.appendChild(listingCard);
//     });

//     displayPagination();
//   } catch (error) {
//     console.error("Error fetching listings:", error);
//   }
// }

// function displayPagination() {
//   const paginationContainer = document.getElementById("pagination-container");
//   paginationContainer.innerHTML = "";

//   const prevButton = document.createElement("button");
//   prevButton.textContent = "Previous";
//   prevButton.disabled = currentPage === 1;
//   prevButton.addEventListener("click", () => {
//     if (currentPage > 1) {
//       currentPage--;
//       fetchAndDisplayListings();
//     }
//   });

//   paginationContainer.appendChild(prevButton);

//   const nextButton = document.createElement("button");
//   nextButton.textContent = "Next";
//   nextButton.addEventListener("click", () => {
//     currentPage++;
//     fetchAndDisplayListings();
//   });

//   paginationContainer.appendChild(nextButton);
// }

fetchAndDisplayListings();
