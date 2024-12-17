import { openAuthModal } from "../auth/authModal";

/**
 * Creates a seller profile card with avatar, name, and bio.
 *
 * The card includes hover effects for interactivity and redirects
 * to the seller's profile page when clicked. If the user is not logged in,
 * the authentication modal is opened with a message prompting the user to log in.
 *
 * @param {Object} seller - The seller object containing their details.
 * @param {string} seller.name - The name of the seller.
 * @param {Object} seller.avatar - The avatar object of the seller.
 * @param {string} seller.avatar.url - The URL of the seller's avatar image.
 * @param {string} [seller.bio] - A short biography of the seller.
 *
 * @returns {HTMLElement} A dynamically generated seller card element.
 *
 * @example
 * // Example usage:
 * const seller = { name: "John Doe", avatar: { url: "avatar.jpg" }, bio: "A brief bio" };
 * const sellerCard = createSellerCard(seller); // Creates the card element
 */

export function createSellerCard(seller) {
  const { name, avatar, bio } = seller;

  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  const isUserLoggedIn = currentUser && currentUser.name && currentUser.email;

  const sellerCard = document.createElement("div");
  sellerCard.classList.add(
    "bg-softSteel",
    "rounded-sm",
    "shadow-lg",
    "p-2",
    "max-w-xs",
    "cursor-pointer",
    "transform",
    "transition-transform",
    "duration-200",
    "hover:scale-105",
  );

  const avatarElement = document.createElement("img");
  avatarElement.src = avatar.url;
  avatarElement.alt = `${name}'s avatar`;
  avatarElement.classList.add(
    "w-24",
    "h-24",
    "rounded-full",
    "mx-auto",
    "mt-4",
    "mb-4",
    "border-4",
    "border-white",
    "object-cover",
  );

  const sellerNameElement = document.createElement("h3");
  sellerNameElement.classList.add(
    "text-xl",
    "font-semibold",
    "text-center",
    "p-2",
    "border-b",
    "border-deepTeal/50",
    "w-3/4",
    "mx-auto",
  );
  sellerNameElement.textContent = name;

  const bioElement = document.createElement("p");
  bioElement.classList.add(
    "text-gray-600",
    "text-sm",
    "mb-2",
    "text-center",
    "font-bold",
    "w-3/4",
    "mx-auto",
  );
  bioElement.textContent = bio || "No bio available.";

  sellerCard.appendChild(sellerNameElement);
  sellerCard.appendChild(avatarElement);
  sellerCard.appendChild(bioElement);

  sellerCard.addEventListener("click", () => {
    if (!isUserLoggedIn) {
      openAuthModal();

      const modal = document.getElementById("auth-popup");

      setTimeout(() => {
        const modalContainer = modal.querySelector("div");
        if (modalContainer) {
          const existingMessage = modalContainer.querySelector("#auth-message");
          if (existingMessage) existingMessage.remove();

          const message = document.createElement("p");
          message.id = "auth-message";
          message.classList.add(
            "text-black",
            "bg-mutedRose",
            "font-semibold",
            "m-auto",
            "p-2",
            "text-center",
            "w-full",
          );
          message.textContent = "You must be logged in to view profiles.";

          modalContainer.insertBefore(message, modalContainer.firstChild);
        }
      }, 0);
    } else {
      window.location.href = `/profile/?name=${seller.name}`;
    }
  });

  return sellerCard;
}
