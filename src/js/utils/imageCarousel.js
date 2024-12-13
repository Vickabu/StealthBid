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
