import { createImageCarousel } from "./createListingsCard";
import { calculateTimeRemaining } from "./timeManagement";
import { onDeleteListing } from "../ui/listing/delete";
import { createSellerCard } from "./sellerCard";
import { onBidListing } from "../api/listings/bid";

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
    "justify-evenly",
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
  timeRemainingElement.classList.add("text-sm", "text-gray-500", "mb-auto");
  timeRemainingElement.innerHTML = "Time Remaining:<br>" + timeRemaining;

  bidInfoContainer.append(highestBidElement, timeRemainingElement);

  // Input field for bid amount
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

  if (isExpired) {
    bidButton.classList.add("opacity-50", "cursor-not-allowed");
    bidButton.disabled = true;
  } else {
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
        // Optionally, refresh the listing or update the bid display
        bidInput.value = ""; // Clear input field after successful bid
      } catch (error) {
        console.error("Failed to place bid:", error);
        alert("Error placing bid. Please try again.");
      }
    });
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
      "rounded-lg",
      "hover:bg-red-600",
      "w-full",
    );
    deleteButton.textContent = "Delete Listing";
    deleteButton.dataset.listingId = id;
    deleteButton.addEventListener("click", onDeleteListing);
    actionButtonsContainer.appendChild(deleteButton);
  }

  actionsSection.append(
    bidInfoContainer,
    bidInput,
    bidButton,
    actionButtonsContainer,
  );

  contentSection.appendChild(detailsSection);
  contentSection.appendChild(actionsSection);

  card.appendChild(contentSection);

  return card;
}

// import { createImageCarousel } from "./createListingsCard";
// import { calculateTimeRemaining } from "./timeManagement";
// import { onDeleteListing } from "../ui/listing/delete";
// import { createSellerCard } from "./sellerCard";

// export function createListingDetailCard(listing) {
//   const { title, description, media, seller, bids = [], endsAt, id } = listing;

//   const timeRemaining = calculateTimeRemaining(endsAt);
//   const isExpired = timeRemaining === "Expired";

//   const currentUser = JSON.parse(localStorage.getItem("userInfo"));

//   const isCurrentUserSeller =
//     currentUser &&
//     seller &&
//     currentUser.name &&
//     seller.name &&
//     currentUser.email &&
//     seller.email &&
//     currentUser.name === seller.name &&
//     currentUser.email === seller.email;

//   const card = document.createElement("div");
//   card.classList.add(
//     "bg-white",
//     "rounded-sm",
//     "shadow-lg",
//     "overflow-hidden",
//     "flex",
//     "flex-col",
//     "max-w-xl",
//     "lg:max-w-4xl",
//     "mx-auto",
//     "my-8",
//     "p-6"
//   );

//   const imageCarousel = createImageCarousel(media);
//   imageCarousel.classList.add(
//     "w-full",
//     "h-80",
//     "object-cover",
//     "justify-center"
//   );
//   card.appendChild(imageCarousel);

//   const contentSection = document.createElement("div");
//   contentSection.classList.add(
//     "flex",
//     "flex-col",
//     "md:flex-row",
//     "gap-6",
//     "mt-6"
//   );

//   const detailsSection = document.createElement("div");
//   detailsSection.classList.add("flex-1");

//   const titleElement = document.createElement("h1");
//   titleElement.classList.add("text-3xl", "font-semibold", "mb-4");
//   titleElement.textContent = title;

//   const descriptionElement = document.createElement("p");
//   descriptionElement.classList.add("text-gray-700", "mb-6");
//   descriptionElement.textContent = description || "No description available.";

//   const sellerCardElement = createSellerCard(seller);

//   detailsSection.append(titleElement, descriptionElement, sellerCardElement);

//   const actionsSection = document.createElement("div");
//   actionsSection.classList.add("w-full", "md:w-72", "flex-shrink-0");

//   const bidInfoContainer = document.createElement("div");
//   bidInfoContainer.classList.add(
//     "flex",
//     "justify-evenly",
//     "items-center",
//     "mb-6"
//   );

//   const highestBidElement = document.createElement("span");
//   highestBidElement.classList.add("font-bold", "text-xl", "text-deepTeal");
//   highestBidElement.innerHTML =
//     bids.length > 0
//       ? `Highest Bid:<br>${new Intl.NumberFormat("en-US", {
//           style: "currency",
//           currency: "USD",
//         }).format(Math.max(...bids.map((bid) => bid.amount)))}`
//       : "No bids yet";

//   const timeRemainingElement = document.createElement("span");
//   timeRemainingElement.classList.add("text-sm", "text-gray-500", "mb-auto");
//   timeRemainingElement.innerHTML = "Time Remaining:<br>" + timeRemaining;

//   bidInfoContainer.append(highestBidElement, timeRemainingElement);

//   const bidButton = document.createElement("button");
//   bidButton.classList.add(
//     "bg-deepTeal",
//     "text-white",
//     "py-3",
//     "px-6",
//     "rounded-sm",
//     "hover:bg-freshSage",
//     "w-full",
//     "mb-6"
//   );
//   bidButton.textContent = "Place A Bid";

//   if (isExpired) {
//     bidButton.classList.add("opacity-50", "cursor-not-allowed");
//     bidButton.disabled = true;
//   }

//   const actionButtonsContainer = document.createElement("div");
//   actionButtonsContainer.classList.add("space-y-4");

//   if (isCurrentUserSeller) {
//     const editButton = document.createElement("button");
//     editButton.classList.add(
//       "bg-blue-500",
//       "text-white",
//       "py-2",
//       "px-6",
//       "rounded-lg",
//       "hover:bg-blue-600",
//       "w-full"
//     );
//     // editButton.textContent = "Edit Listing";
//     // editButton.addEventListener("click", function () {
//     //   window.location.href = `/listing/edit?id=${listing.id}`;
//     // });
//     // actionButtonsContainer.appendChild(editButton);

//     const deleteButton = document.createElement("button");
//     deleteButton.classList.add(
//       "bg-red-500",
//       "text-white",
//       "py-2",
//       "px-6",
//       "rounded-lg",
//       "hover:bg-red-600",
//       "w-full"
//     );
//     deleteButton.textContent = "Delete Listing";
//     deleteButton.dataset.listingId = id;
//     deleteButton.addEventListener("click", onDeleteListing);
//     actionButtonsContainer.appendChild(deleteButton);
//   }

//   actionsSection.append(bidInfoContainer, bidButton, actionButtonsContainer);

//   contentSection.appendChild(detailsSection);
//   contentSection.appendChild(actionsSection);

//   card.appendChild(contentSection);

//   // card.addEventListener("click", (e) => {
//   //   if (!e.target.classList.contains("bid-button")) {
//   //     console.log(`Navigate to detailed listing ${listing.id}`);
//   //     window.location.href = `/listing/?id=${listing.id}`;
//   //   }
//   // });

//   return card;
// }
