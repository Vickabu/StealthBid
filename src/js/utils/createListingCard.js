import { calculateTimeRemaining } from "./timeManagement";
import { onDeleteListing } from "../ui/listing/delete";
import { createSellerCard } from "./sellerCard";
import { onBidListing } from "../api/listings/bid";
import { createImageCarousel } from "./imageCarousel";

export function createListingDetailCard(listing) {
  const { title, description, media, seller, bids = [], endsAt, id } = listing;

  const timeRemaining = calculateTimeRemaining(endsAt);
  const isExpired = timeRemaining === "Expired";

  const currentUser = JSON.parse(localStorage.getItem("userInfo"));

  const isCurrentUserSeller =
    currentUser &&
    seller &&
    currentUser.name &&
    seller.name &&
    currentUser.email &&
    seller.email &&
    currentUser.name === seller.name &&
    currentUser.email === seller.email;

  const card = document.createElement("div");
  card.classList.add(
    "bg-white",
    "rounded-sm",
    "shadow-lg",
    "overflow-hidden",
    "flex",
    "flex-col",
    "max-w-xl",
    "lg:max-w-4xl",
    "mx-auto",
    "my-8",
    "p-6",
  );

  const imageCarousel = createImageCarousel(media);
  imageCarousel.classList.add(
    "w-full",
    "h-80",
    "object-cover",
    "justify-center",
  );
  card.appendChild(imageCarousel);

  const contentSection = document.createElement("div");
  contentSection.classList.add(
    "flex",
    "flex-col",
    "md:flex-row",
    "gap-6",
    "mt-6",
  );

  const detailsSection = document.createElement("div");
  detailsSection.classList.add("flex-1");

  const titleElement = document.createElement("h1");
  titleElement.classList.add("text-3xl", "font-semibold", "mb-4");
  titleElement.textContent = title;

  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("text-gray-700", "mb-6");
  descriptionElement.textContent = description || "No description available.";

  const sellerCardElement = createSellerCard(seller);

  detailsSection.append(titleElement, descriptionElement, sellerCardElement);

  const actionsSection = document.createElement("div");
  actionsSection.classList.add("w-full", "md:w-72", "flex-shrink-0");

  const bidInfoContainer = document.createElement("div");
  bidInfoContainer.classList.add(
    "flex",
    "justify-between",
    "items-center",
    "mb-6",
  );

  const highestBidElement = document.createElement("span");
  highestBidElement.classList.add("font-bold", "text-xl", "text-deepTeal");
  highestBidElement.innerHTML =
    bids.length > 0
      ? `Highest Bid:<br>${new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Math.max(...bids.map((bid) => bid.amount)))}`
      : "No bids yet";

  const timeRemainingElement = document.createElement("span");
  timeRemainingElement.classList.add(
    "text-sm",
    "text-gray-500",
    "mb-auto",
    "text-right",
  );
  timeRemainingElement.innerHTML = "Time Remaining:<br>" + timeRemaining;

  bidInfoContainer.append(highestBidElement, timeRemainingElement);

  actionsSection.append(bidInfoContainer);

  if (bids.length > 0) {
    const viewBidsButton = document.createElement("button");
    viewBidsButton.classList.add(
      "bg-deepTeal",
      "text-white",
      "py-2",
      "px-4",
      "rounded-sm",
      "hover:bg-freshSage",
      "w-full",
      "mb-6",
    );
    viewBidsButton.textContent = "View Bids";

    viewBidsButton.addEventListener("click", () => {
      showBidsPopup(bids, title);
    });

    actionsSection.appendChild(viewBidsButton);
  }

  if (!isExpired && !isCurrentUserSeller) {
    const bidInput = document.createElement("input");
    bidInput.type = "number";
    bidInput.name = "bidAmount";
    bidInput.placeholder = "Enter your bid amount";
    bidInput.classList.add(
      "w-full",
      "border",
      "border-gray-300",
      "rounded-sm",
      "p-3",
      "mb-4",
    );
    bidInput.min = 1;

    const bidButton = document.createElement("button");
    bidButton.classList.add(
      "bg-deepTeal",
      "text-white",
      "py-3",
      "px-6",
      "rounded-sm",
      "hover:bg-freshSage",
      "w-full",
      "mb-6",
    );
    bidButton.textContent = "Place A Bid";

    bidButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const bidAmount = parseFloat(bidInput.value);

      if (!bidAmount || bidAmount <= 0) {
        alert("Please enter a valid bid amount.");
        return;
      }

      try {
        await onBidListing(id, bidAmount);
        alert("Bid placed successfully!");
        bidInput.value = "";
      } catch (error) {
        console.error("Failed to place bid:", error);
        alert("Error placing bid. Please try again.");
      }
    });

    actionsSection.append(bidInput, bidButton);
  }

  const actionButtonsContainer = document.createElement("div");
  actionButtonsContainer.classList.add("space-y-4");

  if (isCurrentUserSeller) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add(
      "bg-red-500",
      "text-white",
      "py-2",
      "px-6",
      "rounded-sm",
      "hover:bg-red-600",
      "w-full",
    );
    deleteButton.textContent = "Delete Listing";
    deleteButton.dataset.listingId = id;
    deleteButton.addEventListener("click", onDeleteListing);
    actionButtonsContainer.appendChild(deleteButton);
  }

  actionsSection.append(actionButtonsContainer);

  contentSection.appendChild(detailsSection);
  contentSection.appendChild(actionsSection);

  card.appendChild(contentSection);

  return card;
}

function showBidsPopup(bids, title) {
  const overlay = document.createElement("div");
  overlay.classList.add(
    "fixed",
    "inset-0",
    "bg-black",
    "bg-opacity-50",
    "flex",
    "items-center",
    "justify-center",
    "z-50",
  );

  const popup = document.createElement("div");
  popup.classList.add(
    "bg-white",
    "rounded-lg",
    "p-6",
    "max-w-lg",
    "w-full",
    "mb-4",
  );

  const headline = document.createElement("h2");
  headline.classList.add("text-xl", "font-bold", "mb-4", "text-center");
  headline.textContent = `All bids on "${title}"`;

  const hr = document.createElement("hr");
  hr.classList.add("mt-4");
  headline.append(hr);

  const bidsList = document.createElement("ul");
  bids
    .sort((a, b) => b.amount - a.amount)
    .forEach((bid) => {
      const listItem = document.createElement("li");
      listItem.classList.add("mb-4", "mt-4");

      const avatar = document.createElement("img");
      avatar.src = bid.bidder.avatar.url;
      avatar.alt = bid.bidder.name;
      avatar.classList.add(
        "w-8",
        "h-8",
        "rounded-full",
        "inline-block",
        "mr-3",
      );

      const name = document.createElement("span");
      name.classList.add("font-semibold");
      name.textContent = bid.bidder.name;

      const amount = document.createElement("span");
      amount.classList.add("text-deepTeal", "font-bold", "ml-3");
      amount.textContent = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(bid.amount);

      const created = document.createElement("span");
      created.classList.add("text-gray-500", "ml-3", "text-sm");
      const bidTime = new Date(bid.created);
      const formattedTime = `${bidTime.getHours()}:${String(
        bidTime.getMinutes(),
      ).padStart(2, "0")}`;
      created.textContent = `Placed at ${formattedTime}`;

      listItem.append(avatar, name, amount, created);
      bidsList.appendChild(listItem);

      const hr = document.createElement("hr");
      bidsList.appendChild(hr);
    });

  const closeButton = document.createElement("button");
  closeButton.classList.add(
    "bg-red-500",
    "text-white",
    "py-2",
    "px-4",
    "rounded-sm",
    "hover:bg-red-600",
    "mt-4",
    "w-full",
  );
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  popup.append(headline, bidsList, closeButton);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}
