import { calculateTimeRemaining } from "./timeManagement";

export function createListingCard(listing) {
  const { title, description, media, seller, bids = [], endsAt } = listing;

  const sellerName = seller?.name || "Unknown Seller";
  const highestBid =
    bids.length > 0
      ? `Highest Bid: ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Math.max(...bids.map((bid) => bid.amount)))}`
      : "No bids";

  const timeRemaining = calculateTimeRemaining(endsAt);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
    "min-h-[485px]",
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

  const sellerElement = document.createElement("div");
  sellerElement.classList.add("text-sm", "text-gray-500", "mb-4");
  sellerElement.textContent = `@${sellerName}`;

  const bidInfoContainer = document.createElement("div");
  bidInfoContainer.classList.add(
    "flex",
    "justify-between",
    "items-center",
    "mb-6",
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
  cardContent.classList.add("p-4", "flex-grow");
  cardContent.append(titleElement, descriptionElement, sellerElement);

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

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("p-4", "mt-auto");

  buttonContainer.appendChild(bidInfoContainer);

  card.appendChild(buttonContainer);

  card.addEventListener("click", (e) => {
    if (!e.target.classList.contains("bid-button")) {
      console.log(`Navigate to listing ${listing.id}`);
      window.location.href = `/listing/?id=${listing.id}`;
    }
  });

  console.log(listing);
  return card;
}

export function createImageCarousel(media) {
  const carousel = document.createElement("div");
  carousel.classList.add(
    "w-full",
    "h-48",
    "bg-gray-200",
    "overflow-hidden",
    "relative",
  );

  if (media && media.length > 0) {
    let currentIndex = 0;

    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("relative", "w-full", "h-full");

    media.forEach((item, index) => {
      const img = document.createElement("img");
      img.src = item.url || "https://via.placeholder.com/400x300";
      img.alt = item.alt || "Listing image";
      img.classList.add(
        "absolute",
        "top-0",
        "left-0",
        "w-full",
        "h-full",
        "object-cover",
        "transition-opacity",
        "duration-500",
        index === 0 ? "opacity-100" : "opacity-0",
      );
      img.dataset.index = index;
      imageWrapper.appendChild(img);
    });

    carousel.appendChild(imageWrapper);

    if (media.length > 1) {
      const prevButton = document.createElement("button");
      prevButton.classList.add(
        "absolute",
        "top-1/2",
        "left-2",
        "transform",
        "-translate-y-1/2",
        "bg-deepTeal",
        "text-white",
        "p-2",
        "rounded-sm",
        "z-10",
        "hover:bg-gray-700",
      );
      prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';

      const nextButton = document.createElement("button");
      nextButton.classList.add(
        "absolute",
        "top-1/2",
        "right-2",
        "transform",
        "-translate-y-1/2",
        "bg-deepTeal",
        "text-white",
        "p-2",
        "rounded-sm",
        "z-10",
        "hover:bg-gray-700",
      );
      nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';

      carousel.appendChild(prevButton);
      carousel.appendChild(nextButton);

      function updateCarousel(newIndex) {
        const images = imageWrapper.querySelectorAll("img");
        if (newIndex < 0) {
          currentIndex = images.length - 1;
        } else if (newIndex >= images.length) {
          currentIndex = 0;
        } else {
          currentIndex = newIndex;
        }

        images.forEach((img, index) => {
          img.classList.toggle("opacity-100", index === currentIndex);
          img.classList.toggle("opacity-0", index !== currentIndex);
        });

        updateDots();
      }

      prevButton.addEventListener("click", (event) => {
        event.stopPropagation();
        updateCarousel(currentIndex - 1);
      });

      nextButton.addEventListener("click", (event) => {
        event.stopPropagation();
        updateCarousel(currentIndex + 1);
      });

      const dotsContainer = document.createElement("div");
      dotsContainer.classList.add(
        "absolute",
        "bottom-2",
        "left-1/2",
        "transform",
        "-translate-x-1/2",
        "flex",
        "space-x-2",
      );

      media.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add(
          "w-2",
          "h-2",
          "rounded-full",
          "bg-deepTeal",
          "opacity-50",
        );
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
      });

      carousel.appendChild(dotsContainer);

      function updateDots() {
        const dots = dotsContainer.querySelectorAll("div");
        dots.forEach((dot, index) => {
          if (index === currentIndex) {
            dot.classList.add("opacity-100");
            dot.classList.remove("opacity-50");
          } else {
            dot.classList.add("opacity-50");
            dot.classList.remove("opacity-100");
          }
        });
      }

      updateDots();
    }
  } else {
    carousel.innerHTML = `<p class="text-center py-20">No images available</p>`;
  }

  return carousel;
}
