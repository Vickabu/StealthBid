import { createImageCarousel } from "./imageCarousel";
import { calculateTimeRemaining } from "./timeManagement";

export function createListingCard(listing) {
  const { title, description, media, seller, bids = [], endsAt } = listing;
  const sellerName = seller?.name || "Unknown Seller";
  const highestBid =
    bids.length > 0
      ? `Highest Bid: ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Math.max(...bids.map((bid) => bid.amount)))}`
      : "No bids yet";
  const timeRemaining = calculateTimeRemaining(endsAt);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const loggedInUserName = userInfo?.name;

  const urlParams = new URLSearchParams(window.location.search);
  const userNameInUrl = urlParams.get("name");

  const isOwner = userInfo?.name === sellerName;

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
    "min-h-[450px]",
    "relative",
  );

  const imageCarousel = createImageCarousel(media);
  card.prepend(imageCarousel);

  const titleElement = document.createElement("h2");
  titleElement.classList.add("text-lg", "font-semibold", "mb-2");
  titleElement.textContent = title;

  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("text-gray-600", "mb-4");
  descriptionElement.textContent = description || "No description available.";

  const bidInfoContainer = document.createElement("div");
  bidInfoContainer.classList.add(
    "flex",
    "justify-between",
    "items-center",
    "p-4",
    "mt-auto",
  );

  const highestBidElement = document.createElement("span");
  highestBidElement.classList.add("font-bold", "text-lg");
  highestBidElement.textContent = highestBid;

  const timeRemainingElement = document.createElement("span");
  timeRemainingElement.classList.add("text-sm", "text-gray-500");
  timeRemainingElement.textContent = timeRemaining;

  bidInfoContainer.appendChild(highestBidElement);
  bidInfoContainer.appendChild(timeRemainingElement);

  const cardContent = document.createElement("div");
  cardContent.classList.add("px-4", "py-2", "flex-grow");
  cardContent.append(titleElement, descriptionElement);

  if (userNameInUrl !== loggedInUserName) {
    const sellerElement = document.createElement("div");
    sellerElement.classList.add("text-sm", "text-gray-500", "mb-4");
    sellerElement.textContent = `@${sellerName}`;
    cardContent.appendChild(sellerElement);
  }

  if (isOwner) {
    const yourListingBadge = document.createElement("div");
    yourListingBadge.classList.add(
      "absolute",
      "top",
      "right-0",
      "bg-deepTeal",
      "text-white",
      "px-3",
      "py-1",
      "text-sm",
      "rounded-sm",
      "shadow-md",
    );
    yourListingBadge.textContent = "Your Listing";
    card.appendChild(yourListingBadge);
  }

  card.appendChild(cardContent);

  card.appendChild(bidInfoContainer);

  cardContent.addEventListener("click", () => {
    window.location.href = `/listing/?id=${listing.id}`;
  });

  return card;
}
