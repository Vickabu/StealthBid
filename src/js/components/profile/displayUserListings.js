import { createListingCard } from "../listings/createListingsCard";
import { createImageCarousel } from "../../utils/imageCarousel";

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

function createWinCard(win) {
  const { title, description, media, endsAt } = win;
  const dateFormatted = new Date(endsAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const card = document.createElement("div");
  card.classList.add(
    "bg-white",
    "rounded-sm",
    "shadow-md",
    "overflow-hidden",
    "hover:shadow-lg",
    "transition-shadow",
    "cursor-pointer",
    "flex",
    "flex-col",
    "min-h-[400px]",
    "relative",
    "mb-4",
  );

  const imageCarousel = createImageCarousel(media);
  card.prepend(imageCarousel);

  const titleElement = document.createElement("h3");
  titleElement.classList.add(
    "text-lg",
    "font-semibold",
    "mb-2",
    "px-4",
    "py-2",
  );
  titleElement.textContent = title || "No Title";

  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("text-gray-600", "mb-4", "px-4");
  descriptionElement.textContent = description || "No description available.";

  const dateElement = document.createElement("span");
  dateElement.classList.add(
    "text-sm",
    "text-gray-500",
    "p-4",
    "mt-auto",
    "border-t",
  );
  dateElement.textContent = `${dateFormatted}`;

  const cardContent = document.createElement("div");
  cardContent.classList.add("flex-grow", "flex", "flex-col");

  cardContent.appendChild(titleElement);
  cardContent.appendChild(descriptionElement);
  cardContent.appendChild(dateElement);

  card.appendChild(cardContent);

  cardContent.addEventListener("click", () => {
    window.location.href = `/listing/?id=${win.id}`;
  });

  return card;
}
