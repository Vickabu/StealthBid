import { readProfile } from "../../api/profile/read";
import { fetchUserListings } from "../../api/listings/read";
import { createListingCard } from "../../utils/createListingsCard";
import { onUpdateProfile } from "../../api/profile/update";

async function displayProfilePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("name");

  if (!userName) {
    console.error("Name not found in URL");
    return;
  }

  try {
    const profileResponse = await readProfile(userName);
    const profileData = profileResponse.data;
    if (!profileData) {
      throw new Error("Invalid profile data structure");
    }

    const listingsResponse = await fetchUserListings(userName);

    const listingsData = listingsResponse.data;
    if (!listingsData) {
      throw new Error("Invalid listings data structure");
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const loggedInUserName = userInfo?.name;

    const profileContainer = document.getElementById("profile-container");
    profileContainer.innerHTML = "";

    const bannerDiv = document.createElement("div");
    bannerDiv.className =
      "relative h-64 w-full bg-cover bg-center cursor-pointer";
    bannerDiv.style.backgroundImage = `url('${profileData.banner?.url || "/default-banner.jpg"}')`;

    const avatarContainer = document.createElement("div");
    avatarContainer.className =
      "absolute top-48 left-1/2 transform -translate-x-1/2 cursor-pointer";
    const avatarImg = document.createElement("img");
    avatarImg.className =
      "w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover";
    avatarImg.src = profileData.avatar?.url || "/DarkLogo.jpg";
    avatarImg.alt = profileData.avatar?.alt || "User avatar";
    avatarContainer.appendChild(avatarImg);

    const profileDetailsDiv = document.createElement("div");
    profileDetailsDiv.className = "mt-24 text-center";

    const nameHeading = document.createElement("h1");
    nameHeading.className = "text-3xl font-bold";
    nameHeading.textContent = profileData.name || "Unknown User";

    const bioParagraph = document.createElement("p");
    bioParagraph.className = "mt-2 text-gray-600 max-w-4xl mx-auto";
    bioParagraph.textContent =
      profileData.bio || "This user has not added a bio.";

    profileDetailsDiv.append(nameHeading, bioParagraph);

    const creditsDiv = document.createElement("div");
    creditsDiv.className = "mt-4 text-lg font-semibold text-gray-800";
    creditsDiv.textContent = `Credits: $${profileData.credits || 0}`;
    profileDetailsDiv.appendChild(creditsDiv);

    const updateFormContainer = document.createElement("div");
    updateFormContainer.className = "mt-6 hidden";

    if (loggedInUserName === userName) {
      const updateButton = document.createElement("button");
      updateButton.id = "update-profile-btn";
      updateButton.className =
        "px-6 py-2 bg-deepTeal text-white font-medium rounded-lg hover:bg-freshSage transition";
      updateButton.textContent = "Update Profile";

      updateButton.addEventListener("click", () => {
        updateFormContainer.classList.remove("hidden");
        updateButton.classList.add("hidden");
      });

      profileDetailsDiv.appendChild(updateButton);

      const form = document.createElement("form");
      form.className = "space-y-4";

      const avatarUrlInput = document.createElement("input");
      avatarUrlInput.type = "url";
      avatarUrlInput.placeholder = "Avatar URL";
      avatarUrlInput.value = profileData.avatar?.url || "";
      avatarUrlInput.className = "w-full p-2 border rounded";
      avatarUrlInput.name = "avatarUrl";

      const bannerUrlInput = document.createElement("input");
      bannerUrlInput.type = "url";
      bannerUrlInput.placeholder = "Banner URL";
      bannerUrlInput.value = profileData.banner?.url || "";
      bannerUrlInput.className = "w-full p-2 border rounded";
      bannerUrlInput.name = "bannerUrl";

      const bioInput = document.createElement("textarea");
      bioInput.placeholder = "Bio";
      bioInput.value = profileData.bio || "";
      bioInput.className = "w-full p-2 border rounded";
      bioInput.name = "bio";

      const formButtons = document.createElement("div");
      formButtons.className = "flex gap-4";

      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.className =
        "px-6 py-2 bg-deepTeal text-white font-medium rounded-lg hover:bg-freshSage transition";
      submitButton.textContent = "Save Changes";

      const cancelButton = document.createElement("button");
      cancelButton.type = "button";
      cancelButton.className =
        "px-6 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-700 transition";
      cancelButton.textContent = "Cancel";

      cancelButton.addEventListener("click", () => {
        updateFormContainer.classList.add("hidden");
        updateButton.classList.remove("hidden");
      });

      form.addEventListener("submit", async (e) => {
        const refreshProfile = () => displayProfilePage();
        await onUpdateProfile(e, userName, refreshProfile);
      });

      formButtons.append(submitButton, cancelButton);
      form.append(avatarUrlInput, bannerUrlInput, bioInput, formButtons);
      updateFormContainer.appendChild(form);
    }

    profileContainer.appendChild(bannerDiv);
    profileContainer.appendChild(avatarContainer);
    profileContainer.appendChild(profileDetailsDiv);
    profileContainer.appendChild(updateFormContainer);

    const listingsSection = document.createElement("div");
    listingsSection.className = "mt-10 text-center";

    const listingsHeading = document.createElement("h2");
    listingsHeading.className = "text-2xl font-semibold mb-4";
    listingsHeading.textContent =
      loggedInUserName === userName
        ? "My Auctions"
        : `${profileData.name}'s Auctions`;

    listingsSection.appendChild(listingsHeading);

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
      noListingsMessage.textContent = "No active auctions.";
      listingsSection.appendChild(noListingsMessage);
    }

    profileContainer.appendChild(listingsSection);
  } catch (error) {
    console.error("Error rendering profile page:", error);
    const profileContainer = document.getElementById("profile-container");
    profileContainer.innerHTML =
      "<p class='text-red-500 text-center mt-10'>Failed to load profile. Please try again later.</p>";
  }
}

displayProfilePage();
