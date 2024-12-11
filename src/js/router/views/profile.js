import { readProfile } from "../../api/profile/read";
import { fetchUserListings } from "../../api/listings/read";
import { createListingCard } from "../../utils/createListingsCard";

async function displayProfilePage() {
  console.log("Display Profile Page Function Loaded");

  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("name");

  if (!userName) {
    console.error("Name not found in URL");
    return;
  }

  try {
    const profileResponse = await readProfile(userName);
    console.log("Profile Response:", profileResponse);

    const profileData = profileResponse.data;
    if (!profileData) {
      throw new Error("Invalid profile data structure");
    }

    // Fetch user's listings
    const listingsResponse = await fetchUserListings(userName);
    console.log("User Listings:", listingsResponse);

    const listingsData = listingsResponse.data;
    if (!listingsData) {
      throw new Error("Invalid listings data structure");
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const loggedInUserName = userInfo?.name;

    const profileContainer = document.getElementById("profile-container");
    profileContainer.innerHTML = "";

    const imageModal = document.createElement("div");
    imageModal.id = "image-modal";
    imageModal.className =
      "fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center hidden";
    const modalImg = document.createElement("img");
    modalImg.className = "max-w-full max-h-full rounded-lg shadow-lg";
    imageModal.appendChild(modalImg);

    imageModal.addEventListener("click", () => {
      imageModal.classList.add("hidden");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        imageModal.classList.add("hidden");
      }
    });

    document.body.appendChild(imageModal);

    const bannerDiv = document.createElement("div");
    bannerDiv.className =
      "relative h-64 w-full bg-cover bg-center cursor-pointer";
    bannerDiv.style.backgroundImage = `url('${profileData.banner?.url || "/default-banner.jpg"}')`;
    bannerDiv.addEventListener("click", () => {
      modalImg.src = profileData.banner?.url || "/default-banner.jpg";
      imageModal.classList.remove("hidden");
    });

    const avatarContainer = document.createElement("div");
    avatarContainer.className =
      "absolute top-48 left-1/2 transform -translate-x-1/2 cursor-pointer";
    const avatarImg = document.createElement("img");
    avatarImg.className =
      "w-36 h-36 rounded-full border-4 border-white shadow-lg";
    avatarImg.src = profileData.avatar?.url || "/DarkLogo.jpg";
    avatarImg.alt = profileData.avatar?.alt || "User avatar";
    avatarImg.addEventListener("click", () => {
      modalImg.src = profileData.avatar?.url || "/DarkLogo.jpg";
      imageModal.classList.remove("hidden");
    });
    avatarContainer.appendChild(avatarImg);

    const profileDetailsDiv = document.createElement("div");
    profileDetailsDiv.className = "mt-24 text-center";

    // Brukerens navn
    const nameHeading = document.createElement("h1");
    nameHeading.className = "text-3xl font-bold";
    nameHeading.textContent = profileData.name || "Unknown User";

    // Bio
    const bioParagraph = document.createElement("p");
    bioParagraph.className = "mt-2 text-gray-600 max-w-4xl mx-auto";
    bioParagraph.textContent =
      profileData.bio || "This user has not added a bio.";

    // Kredittinformasjon
    profileDetailsDiv.append(nameHeading, bioParagraph);

    // Hvis det er den påloggede brukerens profil, vis oppdateringsknappen
    if (loggedInUserName === userName) {
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "mt-6 text-center";

      const updateButton = document.createElement("button");
      updateButton.className =
        "px-6 py-2 bg-deepTeal text-white font-medium rounded-lg hover:bg-freshSage transition";
      updateButton.textContent = "Update Profile";
      updateButton.addEventListener("click", () => {
        window.location.href = "/update-profile";
      });

      const creditsDiv = document.createElement("div");
      creditsDiv.className = "mt-4 text-lg font-semibold text-gray-800";
      creditsDiv.textContent = `Credits: $${profileData.credits || 0}`;

      buttonContainer.appendChild(updateButton);
      profileDetailsDiv.append(creditsDiv, buttonContainer);
    }

    profileContainer.appendChild(bannerDiv);
    profileContainer.appendChild(avatarContainer);
    profileContainer.appendChild(profileDetailsDiv);

    const listingsSection = document.createElement("div");
    listingsSection.className = "mt-10 text-center";

    const listingsHeading = document.createElement("h2");
    listingsHeading.className = "text-2xl font-semibold mb-4";
    if (loggedInUserName === userName) {
      listingsHeading.textContent = "My Auctions";
    } else {
      listingsHeading.textContent = `${profileData.name}'s Auctions`;
    }

    listingsSection.appendChild(listingsHeading);

    // Legg til grid container
    const gridContainer = document.createElement("div");
    gridContainer.className =
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto";

    if (listingsData.length > 0) {
      listingsData.forEach((listing) => {
        const listingCard = createListingCard(listing);
        gridContainer.appendChild(listingCard);
      });

      listingsSection.appendChild(gridContainer);
    } else {
      const noListingsMessage = document.createElement("p");
      noListingsMessage.className = "text-gray-500";
      noListingsMessage.textContent = "This user has no active auctions.";
      listingsSection.appendChild(noListingsMessage);
    }

    profileContainer.appendChild(listingsSection);

    profileContainer.appendChild(listingsSection);
  } catch (error) {
    console.error("Error rendering profile page:", error);

    const profileContainer = document.getElementById("profile-container");
    profileContainer.innerHTML =
      "<p class='text-red-500 text-center mt-10'>Failed to load profile. Please try again later.</p>";
  }
}

displayProfilePage();

// import { readProfile } from "../../api/profile/read";
// import { fetchUserListings } from "../../api/listings/read";

// async function displayProfilePage() {
//   console.log("Display Profile Page Function Loaded");

//   const urlParams = new URLSearchParams(window.location.search);
//   const userName = urlParams.get("name");

//   if (!userName) {
//     console.error("Name not found in URL");
//     return;
//   }

//   try {
//     const profileResponse = await readProfile(userName);
//     console.log("Profile Response:", profileResponse);

//     const profileData = profileResponse.data;
//     if (!profileData) {
//       throw new Error("Invalid profile data structure");
//     }

//     // Fetch user's listings
//     const listingsResponse = await fetchUserListings(userName);
//     console.log("User Listings:", listingsResponse);

//     const listingsData = listingsResponse.data; // assuming response data contains the listings
//     if (!listingsData) {
//       throw new Error("Invalid listings data structure");
//     }

//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     const loggedInUserName = userInfo?.name;

//     const profileContainer = document.getElementById("profile-container");
//     profileContainer.innerHTML = "";

//     const imageModal = document.createElement("div");
//     imageModal.id = "image-modal";
//     imageModal.className =
//       "fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center hidden";
//     const modalImg = document.createElement("img");
//     modalImg.className = "max-w-full max-h-full rounded-lg shadow-lg";
//     imageModal.appendChild(modalImg);

//     imageModal.addEventListener("click", () => {
//       imageModal.classList.add("hidden");
//     });

//     document.addEventListener("keydown", (e) => {
//       if (e.key === "Escape") {
//         imageModal.classList.add("hidden");
//       }
//     });

//     document.body.appendChild(imageModal);

//     const bannerDiv = document.createElement("div");
//     bannerDiv.className =
//       "relative h-64 w-full bg-cover bg-center cursor-pointer";
//     bannerDiv.style.backgroundImage = `url('${profileData.banner?.url || "/default-banner.jpg"}')`;
//     bannerDiv.addEventListener("click", () => {
//       modalImg.src = profileData.banner?.url || "/default-banner.jpg";
//       imageModal.classList.remove("hidden");
//     });

//     const avatarContainer = document.createElement("div");
//     avatarContainer.className =
//       "absolute top-48 left-1/2 transform -translate-x-1/2 cursor-pointer";
//     const avatarImg = document.createElement("img");
//     avatarImg.className =
//       "w-36 h-36 rounded-full border-4 border-white shadow-lg";
//     avatarImg.src = profileData.avatar?.url || "/DarkLogo.jpg";
//     avatarImg.alt = profileData.avatar?.alt || "User avatar";
//     avatarImg.addEventListener("click", () => {
//       modalImg.src = profileData.avatar?.url || "/DarkLogo.jpg";
//       imageModal.classList.remove("hidden");
//     });
//     avatarContainer.appendChild(avatarImg);

//     const profileDetailsDiv = document.createElement("div");
//     profileDetailsDiv.className = "mt-24 text-center";
//     const nameHeading = document.createElement("h1");
//     nameHeading.className = "text-3xl font-bold";
//     nameHeading.textContent = profileData.name || "Unknown User";

//     const bioParagraph = document.createElement("p");
//     bioParagraph.className = "mt-2 text-gray-600";
//     bioParagraph.textContent =
//       profileData.bio || "This user has not added a bio.";

//     profileDetailsDiv.append(nameHeading, bioParagraph);

//     if (loggedInUserName === userName) {
//       const buttonContainer = document.createElement("div");
//       buttonContainer.className = "mt-6 text-center";

//       const updateButton = document.createElement("button");
//       updateButton.className =
//         "px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition";
//       updateButton.textContent = "Update Profile";
//       updateButton.addEventListener("click", () => {
//         window.location.href = "/update-profile";
//       });

//       buttonContainer.appendChild(updateButton);
//       profileDetailsDiv.appendChild(buttonContainer);
//     }

//     profileContainer.appendChild(bannerDiv);
//     profileContainer.appendChild(avatarContainer);
//     profileContainer.appendChild(profileDetailsDiv);

//     // Adding section for user's listings
//     const listingsSection = document.createElement("div");
//     listingsSection.className = "mt-10 text-center";

//     // Change title based on whether it's the logged-in user's profile or someone else's
//     const listingsHeading = document.createElement("h2");
//     listingsHeading.className = "text-2xl font-semibold mb-4";
//     if (loggedInUserName === userName) {
//       listingsHeading.textContent = "My Auctions"; // If it's the logged-in user's profile
//     } else {
//       listingsHeading.textContent = `${profileData.name}'s Auctions`; // If it's someone else's profile
//     }

//     listingsSection.appendChild(listingsHeading);

//     if (listingsData.length > 0) {
//       const listingsList = document.createElement("ul");
//       listingsList.className = "space-y-4";

//       listingsData.forEach((listing) => {
//         const listingItem = document.createElement("li");
//         listingItem.className = "border p-4 rounded-md shadow-md";

//         const listingTitle = document.createElement("h3");
//         listingTitle.className = "font-semibold text-xl";
//         listingTitle.textContent = listing.title; // Assuming the listing has a title field

//         const listingDescription = document.createElement("p");
//         listingDescription.className = "text-gray-500 mt-2";
//         listingDescription.textContent =
//           listing.description || "No description available"; // Assuming description exists

//         listingItem.appendChild(listingTitle);
//         listingItem.appendChild(listingDescription);

//         listingsList.appendChild(listingItem);
//       });

//       listingsSection.appendChild(listingsList);
//     } else {
//       const noListingsMessage = document.createElement("p");
//       noListingsMessage.className = "text-gray-500";
//       noListingsMessage.textContent = "This user has no active auctions.";
//       listingsSection.appendChild(noListingsMessage);
//     }

//     profileContainer.appendChild(listingsSection);
//   } catch (error) {
//     console.error("Error rendering profile page:", error);

//     const profileContainer = document.getElementById("profile-container");
//     profileContainer.innerHTML =
//       "<p class='text-red-500 text-center mt-10'>Failed to load profile. Please try again later.</p>";
//   }
// }

displayProfilePage();

// import { readProfile } from "../../api/profile/read";

// async function displayProfilePage() {
//   console.log("Display Profile Page Function Loaded");

//   const urlParams = new URLSearchParams(window.location.search);
//   const userName = urlParams.get("name");

//   if (!userName) {
//     console.error("Name not found in URL");
//     return;
//   }

//   try {
//     const profileResponse = await readProfile(userName);
//     console.log("Profile Response:", profileResponse);

//     const profileData = profileResponse.data;
//     if (!profileData) {
//       throw new Error("Invalid profile data structure");
//     }

//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     const loggedInUserName = userInfo?.name;

//     const profileContainer = document.getElementById("profile-container");
//     profileContainer.innerHTML = "";

//     const bannerDiv = document.createElement("div");
//     bannerDiv.className = "relative h-64 w-full bg-cover bg-center";
//     bannerDiv.style.backgroundImage = `url('${profileData.banner?.url || "/default-banner.jpg"}')`;

//     const avatarContainer = document.createElement("div");
//     avatarContainer.className =
//       "absolute top-48 left-1/2 transform -translate-x-1/2";
//     const avatarImg = document.createElement("img");
//     avatarImg.className =
//       "w-36 h-36 rounded-full border-4 border-white shadow-lg";
//     avatarImg.src = profileData.avatar?.url || "/DarkLogo.jpg";
//     avatarImg.alt = profileData.avatar?.alt || "User avatar";
//     avatarContainer.appendChild(avatarImg);

//     const profileDetailsDiv = document.createElement("div");
//     profileDetailsDiv.className = "mt-24 text-center";
//     const nameHeading = document.createElement("h1");
//     nameHeading.className = "text-3xl font-bold";
//     nameHeading.textContent = profileData.name || "Unknown User";

//     const bioParagraph = document.createElement("p");
//     bioParagraph.className = "mt-2 text-gray-600";
//     bioParagraph.textContent =
//       profileData.bio || "This user has not added a bio.";

//     profileDetailsDiv.append(nameHeading, bioParagraph);

//     if (loggedInUserName === userName) {
//       const buttonContainer = document.createElement("div");
//       buttonContainer.className = "mt-6 text-center";

//       const updateButton = document.createElement("button");
//       updateButton.className =
//         "px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition";
//       updateButton.textContent = "Update Profile";
//       updateButton.addEventListener("click", () => {
//         window.location.href = "/update-profile";
//       });

//       buttonContainer.appendChild(updateButton);
//       profileDetailsDiv.appendChild(buttonContainer);
//     }

//     profileContainer.appendChild(bannerDiv);
//     profileContainer.appendChild(avatarContainer);
//     profileContainer.appendChild(profileDetailsDiv);
//   } catch (error) {
//     console.error("Error rendering profile page:", error);

//     const profileContainer = document.getElementById("profile-container");
//     profileContainer.innerHTML =
//       "<p class='text-red-500 text-center mt-10'>Failed to load profile. Please try again later.</p>";
//   }
// }

// displayProfilePage();
