import { createListingCard } from "../listings/createListingsCard";
import { createWinCard } from "./winCard";

/**
 * Displays the user's active listings and wins on their profile page. If the logged-in user is the same as the user whose profile is being displayed,
 * sections for "My Auctions" and "My Wins" are shown. Listings and wins are dynamically populated into their respective containers.
 *
 * @param {Array} listingsData - Array of listings data for the user.
 * @param {Object} listingsData[] - Each listing contains information about a specific auction.
 * @param {string} listingsData[].title - The title of the listing.
 * @param {string} listingsData[].description - The description of the listing.
 * @param {Array} listingsData[].media - Array of media for the listing (images/videos).
 * @param {string} listingsData[].endsAt - The end date and time of the listing.
 *
 * @param {Array} winsData - Array of wins data for the user.
 * @param {Object} winsData[] - Each win contains information about a specific auction the user has won.
 * @param {string} winsData[].title - The title of the won listing.
 * @param {string} winsData[].description - The description of the won listing.
 * @param {Array} winsData[].media - Array of media for the won listing (images/videos).
 * @param {string} winsData[].endsAt - The end date and time of the won listing.
 *
 * @param {string} userName - The username of the profile being viewed.
 * @param {string} loggedInUserName - The username of the logged-in user.
 *
 * @returns {void}
 */

export async function displayUserListings(
  listingsData,
  winsData,
  userName,
  loggedInUserName,
) {
  const listingsHeading = document.createElement("h2");
  listingsHeading.className =
    "text-2xl font-semibold mb-4 text-center p-4 border-b border-deepTeal";
  listingsHeading.textContent =
    loggedInUserName === userName ? "My Auctions" : `${userName}'s Auctions`;

  const listingsContainer = document.getElementById("listings-container");
  listingsContainer.innerHTML = "";

  listingsContainer.parentElement?.insertBefore(
    listingsHeading,
    listingsContainer,
  );

  if (listingsData.length > 0) {
    listingsData.forEach((listing) => {
      const listingCard = createListingCard(listing);
      listingsContainer.appendChild(listingCard);
    });
  } else {
    const noListingsMessage = document.createElement("p");
    noListingsMessage.className = "text-gray-500 text-center col-span-full";
    noListingsMessage.textContent = "No active auctions.";
    listingsContainer.appendChild(noListingsMessage);
  }

  if (loggedInUserName === userName) {
    const winsHeading = document.createElement("h2");
    winsHeading.className =
      "text-2xl font-semibold mb-4 text-center p-4 border-b border-deepTeal mt-8";
    winsHeading.textContent =
      loggedInUserName === userName ? "My Wins" : `${userName}'s Wins`;

    const winsContainer = document.getElementById("wins-container");
    winsContainer.innerHTML = "";

    winsContainer.parentElement?.insertBefore(winsHeading, winsContainer);

    if (winsData.length > 0) {
      winsData.forEach((win) => {
        const winCard = createWinCard(win);
        winsContainer.appendChild(winCard);
      });
    } else {
      const noWinsMessage = document.createElement("p");
      noWinsMessage.className = "text-gray-500 text-center col-span-full";
      noWinsMessage.textContent = "No wins found.";
      winsContainer.appendChild(noWinsMessage);
    }
  }
}
