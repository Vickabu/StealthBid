export function createSellerCard(seller) {
  const { name, avatar, bio, banner } = seller;

  const sellerCard = document.createElement("div");
  sellerCard.classList.add(
    "bg-softSteel",
    "rounded-sm",
    "shadow-lg",
    "p-4",
    "mt-10",
    "max-w-sm"
  );

  const sellerCardHeading = document.createElement("h2");
  sellerCardHeading.classList.add(
    "text-xl",
    "font-bold",
    "text-center",
    "mb-4"
  );
  sellerCardHeading.textContent = "Seller";

  sellerCard.appendChild(sellerCardHeading);

  if (banner?.url) {
    const bannerElement = document.createElement("img");
    bannerElement.src = banner.url;
    bannerElement.alt = `${name}'s Banner`;
    bannerElement.classList.add(
      "w-full",
      "h-48",
      "object-cover",
      "rounded-t-sm"
    );
    sellerCard.appendChild(bannerElement);
  }

  const avatarElement = document.createElement("img");
  avatarElement.src = avatar.url;
  avatarElement.alt = `${name}'s avatar`;
  avatarElement.classList.add(
    "w-24",
    "h-24",
    "rounded-full",
    "mx-auto",
    "mt-4",
    "border-4",
    "border-white"
  );

  const sellerNameElement = document.createElement("h3");
  sellerNameElement.classList.add(
    "text-xl",
    "font-semibold",
    "text-center",
    "mt-4"
  );
  sellerNameElement.textContent = name;

  const bioElement = document.createElement("p");
  bioElement.classList.add("text-gray-600", "text-sm", "mt-2", "text-center");
  bioElement.textContent = bio || "No bio available.";

  sellerCard.appendChild(avatarElement);
  sellerCard.appendChild(sellerNameElement);
  sellerCard.appendChild(bioElement);

  return sellerCard;
}
