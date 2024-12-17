import { createImageCarousel } from "../../utils/imageCarousel";

/**
 * Creates a card element displaying the information of a win. The card includes the title, description, media, and the end date of the auction.
 * The card is clickable and redirects to the auction page when clicked.
 *
 * @param {Object} win - The win data for a specific auction that the user has won.
 * @param {string} win.title - The title of the auction the user has won.
 * @param {string} win.description - The description of the auction.
 * @param {Array} win.media - Array of media related to the auction (images/videos).
 * @param {string} win.endsAt - The end date and time of the auction.
 *
 * @returns {HTMLElement} - The created card element for the win.
 */

export function createWinCard(win) {
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
