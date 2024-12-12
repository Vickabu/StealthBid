import { displayListings } from "../../utils/displayListing";

displayListings();

// let currentPage = 1;
// const itemsPerPage = 12;

// document.getElementById("sort-dropdown").addEventListener("change", (event) => {
//   const sortOption = event.target.value;
//   const searchQuery = document.getElementById("search-bar").value.trim();
//   const sortOrder = "asc";

//   showLoader();
//   fetchAndDisplayListings(searchQuery, sortOption, sortOrder);
// });

// document
//   .getElementById("search-bar")
//   .addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//       const query = event.target.value.trim();
//       if (query) {
//         showLoader();
//         fetchAndDisplayListings(query);
//         showSearchTag(query);
//       }
//     }
//   });

// function showSearchTag(query) {
//   const searchTagContainer = document.getElementById("search-tag-container");
//   searchTagContainer.innerHTML = "";
//   searchTagContainer.classList.add(
//     "justify-between",
//     "bg-red-500",
//     "rounded-sm",
//     "px-3",
//     "py-2",
//     "flex"
//   );

//   const searchTag = document.createElement("div");
//   searchTag.classList.add("font-bold");
//   searchTag.textContent = `${query}`;

//   const removeTagButton = document.createElement("button");
//   removeTagButton.textContent = "×";
//   removeTagButton.classList.add("pr-2");
//   removeTagButton.onclick = () => {
//     searchTagContainer.innerHTML = "";
//     document.getElementById("search-bar").value = "";
//     fetchAndDisplayListings();
//   };
//   searchTagContainer.append(removeTagButton, searchTag);
// }

// const sortOptionsMap = {
//   newest: { sort: "created", sortOrder: "desc" },
//   oldest: { sort: "created", sortOrder: "asc" },
//   "time-low-high": { sort: "endsAt", sortOrder: "asc" },
//   "time-high-low": { sort: "endsAt", sortOrder: "desc" },
//   "a-z": { sort: "title", sortOrder: "asc" },
//   "z-a": { sort: "title", sortOrder: "desc" },
// };

// export async function fetchAndDisplayListings(
//   query = "",
//   sortOption = "time-low-high"
// ) {
//   try {
//     const { sort, sortOrder } = sortOptionsMap[sortOption] || {};
//     if (!sort || !sortOrder) {
//       throw new Error(`Invalid sort option: ${sortOption}`);
//     }

//     let listings = [];
//     if (query) {
//       listings = await fetchSearchListings(query, 1, 100, sort, sortOrder);
//     } else {
//       listings = await fetchAllListingsData(100, sort, sortOrder);
//     }

//     console.log("API Call Details:", { query, sort, sortOrder });
//     console.log("Fetched Listings:", listings);

//     const totalPages = Math.ceil(listings.length / itemsPerPage);

//     const paginatedListings = listings.slice(
//       (currentPage - 1) * itemsPerPage,
//       currentPage * itemsPerPage
//     );

//     const listingsContainer = document.getElementById("listings-container");
//     listingsContainer.innerHTML = "";

//     paginatedListings.forEach((listing) => {
//       const listingCard = createListingCard(listing);
//       listingsContainer.appendChild(listingCard);
//     });

//     displayPagination(totalPages);
//   } catch (error) {
//     console.error("Error fetching and displaying listings:", error);
//   } finally {
//     hideLoader();
//   }
// }

// function displayPagination(totalPages) {
//   const paginationContainer = document.getElementById("pagination-container");
//   paginationContainer.innerHTML = "";

//   for (let i = 1; i <= totalPages; i++) {
//     const button = document.createElement("button");
//     button.textContent = i;
//     button.onclick = () => {
//       currentPage = i;
//       showLoader();
//       fetchAndDisplayListings();
//     };

//     paginationContainer.appendChild(button);
//   }
// }

// async function fetchAllListingsData(
//   limit = 100,
//   sort = "endsAt",
//   sortOrder = "asc"
// ) {
//   return fetchListings(1, limit, "", sort, sortOrder);
// }

// fetchAndDisplayListings();
