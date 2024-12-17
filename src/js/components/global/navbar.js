import { createAuthModal, openAuthModal } from "../auth/authModal";
import { logout } from "../../ui/global/logout";

/**
 * Creates a navbar with a Sign In button and a global authentication modal.
 * The modal includes Login and Register forms and supports toggling between them.
 *
 * @example
 * createNavbarAndModal();
 * document.body.appendChild(navbar);
 */

export async function createNavbarAndModal() {
  const navbar = createNavbar();
  const modal = createAuthModal();

  document.body.insertAdjacentElement("afterbegin", navbar);
  document.body.insertAdjacentElement("beforeend", modal);
}

/**
 * Creates and appends a responsive navigation bar to the header of the page.
 * The navbar includes a logo, links for "Home" and "Create Listing", user authentication buttons,
 * and a user profile button (if the user is logged in).
 *
 * - If the user is logged in, a profile button with the user's avatar, a "Log Out" button,
 *   and a link to create a new listing are displayed.
 * - If the user is not logged in, a "Sign In" button is displayed instead.
 *
 * The navbar is responsive, with a collapsible mobile menu that contains the same links and buttons.
 *
 * This function also manages the active state of the navbar links, updating the styles for the
 * currently active page link.
 *
 * @returns {HTMLElement} The navbar element that was created and appended to the page.
 */

function createNavbar() {
  const header = document.querySelector("header");

  const navbar = document.createElement("nav");
  navbar.classList.add("bg-deepTeal", "p-2");

  const innerContainer = document.createElement("div");
  innerContainer.classList.add(
    "container",
    "mx-auto",
    "flex",
    "items-center",
    "justify-between",
    "max-w-screen-xl",
    "w-full",
  );

  const logo = document.createElement("img");
  logo.src = "/BrightLogo.png";
  logo.alt = "Logo";
  logo.classList.add("h-12", "cursor-pointer");
  logo.addEventListener("click", () => {
    window.location.href = "/";
  });

  const rightContainer = document.createElement("div");
  rightContainer.classList.add("hidden", "lg:flex", "gap-8");

  const mobileMenu = document.createElement("div");
  mobileMenu.classList.add(
    "lg:hidden",
    "hidden",
    "flex",
    "flex-col",
    "items-center",
    "bg-deepTeal",
    "absolute",
    "top-16",
    "left-0",
    "right-0",
    "p-6",
    "space-y-4",
    "text-lg",
    "gap-6",
    "z-50",
  );

  const authButton = document.createElement("button");
  authButton.id = "auth-btn";
  const userInfo = localStorage.getItem("userInfo");

  const homeLink = document.createElement("a");
  homeLink.href = "/";
  homeLink.classList.add(
    "text-white",
    "hover:text-gray-400",
    "mobile-menu-link",
    "my-auto",
  );
  homeLink.textContent = "Home";
  homeLink.addEventListener("click", handleActiveLink);
  rightContainer.append(homeLink);

  if (userInfo) {
    const parsedUserInfo = JSON.parse(userInfo);
    const avatarUrl = parsedUserInfo.avatar.url;
    const avatarAlt = parsedUserInfo.avatar.alt;
    const userName = parsedUserInfo.name;

    authButton.textContent = "Log Out";
    authButton.classList.add(
      "bg-mutedRose",
      "text-black",
      "py-2",
      "px-3",
      "rounded-sm",
      "hover:bg-[#B16E6E]",
      "hover:underline",
      "font-bold",
      "border",
      "border-black",
      "text-xs",
      "sm:text-md",
    );
    authButton.addEventListener("click", logout);

    const profileButton = document.createElement("button");
    profileButton.classList.add("flex", "items-center", "space-x-2");

    const avatarImage = document.createElement("img");
    avatarImage.src = avatarUrl;
    avatarImage.alt = avatarAlt;
    avatarImage.classList.add("w-12", "h-12", "rounded-full", "object-cover");

    profileButton.appendChild(avatarImage);

    profileButton.addEventListener("click", () => {
      window.location.href = `/profile/?name=${userName}`;
    });

    const createListingLink = document.createElement("a");
    createListingLink.href = "/listing/create/";
    createListingLink.classList.add(
      "text-white",
      "hover:text-gray-400",
      "mobile-menu-link",
      "text-center",
      "my-auto",
    );
    createListingLink.textContent = "Create Listing";
    createListingLink.addEventListener("click", handleActiveLink);

    rightContainer.append(createListingLink, profileButton, authButton);

    const mobileHomeLink = homeLink.cloneNode(true);
    const mobileCreateListingLink = createListingLink.cloneNode(true);
    const mobileProfileButton = profileButton.cloneNode(true);
    const mobileAuthButton = authButton.cloneNode(true);

    mobileMenu.appendChild(mobileHomeLink);
    mobileMenu.prepend(mobileProfileButton);
    mobileMenu.append(mobileCreateListingLink, mobileAuthButton);

    mobileCreateListingLink.addEventListener("click", () => {
      window.location.href = "/listing/create/";
    });

    mobileHomeLink.addEventListener("click", () => {
      window.location.href = "/";
    });

    mobileProfileButton.addEventListener("click", () => {
      window.location.href = `/profile/?name=${userName}`;
    });

    mobileAuthButton.addEventListener("click", logout);
  } else {
    authButton.textContent = "Sign In";
    authButton.classList.add(
      "bg-dustyTan",
      "py-2",
      "px-4",
      "rounded-sm",
      "text-black",
      "hover:bg-warmSand",
      "hover:underline",
      "font-bold",
      "border",
      "border-black",
      "text-sm",
      "sm:text-md",
    );
    authButton.addEventListener("click", openAuthModal);

    rightContainer.append(authButton);

    const mobileAuthButton = authButton.cloneNode(true);
    mobileMenu.append(mobileAuthButton);

    mobileAuthButton.addEventListener("click", openAuthModal);
  }

  innerContainer.append(logo, rightContainer);

  const hamburgerContainer = document.createElement("div");
  hamburgerContainer.classList.add("lg:hidden", "ml-auto", "cursor-pointer");

  const hamburger = document.createElement("div");
  hamburger.classList.add("block");
  const hamburgerIcon = document.createElement("i");
  hamburgerIcon.classList.add("fas", "fa-bars", "text-white", "text-3xl");
  hamburger.appendChild(hamburgerIcon);
  hamburgerContainer.appendChild(hamburger);

  innerContainer.appendChild(hamburgerContainer);

  navbar.appendChild(innerContainer);
  navbar.appendChild(mobileMenu);

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  header.appendChild(navbar);

  setActiveLink();

  return navbar;
}

function setActiveLink() {
  const links = document.querySelectorAll(".mobile-menu-link");
  links.forEach((link) => {
    if (getBaseUrl(link.href) === getBaseUrl(window.location.href)) {
      link.classList.add("border-b", "border-white", "text-white");
    }
  });
}

function getBaseUrl(url) {
  const a = document.createElement("a");
  a.href = url;
  return a.origin + a.pathname;
}

function handleActiveLink(event) {
  const links = document.querySelectorAll(".mobile-menu-link");
  links.forEach((link) => {
    link.classList.remove("border-b-2", "border-white", "text-white");
  });

  event.target.classList.add("border-b-2", "border-white", "text-white");
}
