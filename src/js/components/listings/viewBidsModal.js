/**
 * Displays a modal with the list of bids for a specific listing.
 * The modal shows bidder details (name, avatar, bid amount, and time placed)
 * and allows the user to close the modal by clicking the close button or pressing the "Escape" key.
 *
 * @param {Array<Object>} bids - An array of bid objects associated with the listing.
 *      Each bid object should contain:
 *      - {Object} bidder - The bidder's details.
 *      - {string} bidder.avatar.url - The URL of the bidder's avatar image.
 *      - {string} bidder.name - The name of the bidder.
 *      - {number} amount - The bid amount.
 *      - {string} created - The timestamp of when the bid was placed.
 * @param {string} title - The title of the listing for which the bids are placed.
 *
 * @returns {void}
 */

export function viewBidsModal(bids, title) {
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
  bidsList.classList.add("max-h-96", "overflow-y-auto", "space-y-4");

  bids
    .sort((a, b) => b.amount - a.amount)
    .forEach((bid) => {
      const listItem = document.createElement("li");
      listItem.classList.add("flex", "mb-4", "mt-4", "justify-evenly");

      const bidderInfo = document.createElement("div");
      bidderInfo.classList.add("items-center");

      const avatar = document.createElement("img");
      avatar.src = bid.bidder.avatar.url;
      avatar.alt = bid.bidder.name;
      avatar.classList.add(
        "w-8",
        "h-8",
        "rounded-full",
        "inline-block",
        "mr-2",
        "object-cover",
      );

      const name = document.createElement("span");
      name.classList.add("font-semibold");
      name.textContent = bid.bidder.name;

      bidderInfo.append(avatar, name);

      const amount = document.createElement("span");
      amount.classList.add("text-deepTeal", "font-bold", "ml-3");
      amount.textContent = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(bid.amount);

      const created = document.createElement("span");
      created.classList.add("text-gray-500", "ml-3", "text-sm");
      const bidTime = new Date(bid.created);
      const formattedTime = `${bidTime.toLocaleDateString("en-US")} ${bidTime.toLocaleTimeString(
        "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
        },
      )}`;
      created.textContent = `Placed on ${formattedTime}`;

      listItem.append(bidderInfo, created, amount);
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

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      document.body.removeChild(overlay);
    }
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      document.body.removeChild(overlay);
    }
  });
}
