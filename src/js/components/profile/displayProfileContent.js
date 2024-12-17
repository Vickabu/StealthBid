import { onUpdateProfile } from "../../ui/profile/update";

export async function displayProfileContent(
  profileData,
  userName,
  loggedInUserName,
) {
  const profileContainer = document.getElementById("profile-container");
  profileContainer.innerHTML = "";

  const bannerDiv = document.createElement("div");
  bannerDiv.className =
    "relative h-72 w-full bg-cover bg-center cursor-pointer max-w-[1920px] mx-auto";
  bannerDiv.style.backgroundImage = `url('${profileData.banner?.url || "/default-banner.jpg"}')`;

  const avatarContainer = document.createElement("div");
  avatarContainer.className =
    "absolute top-64 left-1/2 transform -translate-x-1/2 cursor-pointer";
  const avatarImg = document.createElement("img");
  avatarImg.className =
    "w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover";
  avatarImg.src = profileData.avatar?.url || "/DarkLogo.jpg";
  avatarImg.alt = profileData.avatar?.alt || "User avatar";
  avatarContainer.appendChild(avatarImg);

  const profileDetailsDiv = document.createElement("div");
  profileDetailsDiv.className = "mt-16 max-w-screen-md text-center mx-auto";

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

  const updateFormContainer = document.createElement("div");
  updateFormContainer.className = "mt-6 hidden";

  if (loggedInUserName === userName) {
    const updateButton = document.createElement("button");
    updateButton.id = "update-profile-btn";
    updateButton.className =
      "px-6 py-2 bg-deepTeal text-white font-medium rounded-lg hover:bg-freshSage transition mt-6";
    updateButton.textContent = "Update Profile";

    updateButton.addEventListener("click", () => {
      updateFormContainer.classList.remove("hidden");
      updateButton.classList.add("hidden");
    });

    profileDetailsDiv.append(creditsDiv, updateButton);

    const form = document.createElement("form");
    form.className = "space-y-4 max-w-xl mx-auto";

    const avatarUrlLabel = document.createElement("label");
    avatarUrlLabel.className = "block text-sm font-medium text-gray-700";
    avatarUrlLabel.textContent = "Avatar URL";

    const avatarUrlInput = document.createElement("input");
    avatarUrlInput.type = "url";
    avatarUrlInput.placeholder = "Avatar URL";
    avatarUrlInput.value = profileData.avatar?.url || "";
    avatarUrlInput.className = "w-full p-2 border rounded";
    avatarUrlInput.name = "avatarUrl";

    const bannerUrlLabel = document.createElement("label");
    bannerUrlLabel.className = "block text-sm font-medium text-gray-700";
    bannerUrlLabel.textContent = "Banner URL";

    const bannerUrlInput = document.createElement("input");
    bannerUrlInput.type = "url";
    bannerUrlInput.placeholder = "Banner URL";
    bannerUrlInput.value = profileData.banner?.url || "";
    bannerUrlInput.className = "w-full p-2 border rounded";
    bannerUrlInput.name = "bannerUrl";

    const bioLabel = document.createElement("label");
    bioLabel.className = "block text-sm font-medium text-gray-700";
    bioLabel.textContent = "Bio";
    form.appendChild(bioLabel);

    const bioInput = document.createElement("textarea");
    bioInput.placeholder = "Bio";
    bioInput.value = profileData.bio || "";
    bioInput.className = "w-full p-2 border rounded h-32";
    bioInput.name = "bio";

    const formButtons = document.createElement("div");
    formButtons.className = "flex gap-4 justify-end";

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
      e.preventDefault();
      await onUpdateProfile(e, userName, () => window.location.reload());
    });

    formButtons.append(submitButton, cancelButton);
    form.append(
      avatarUrlLabel,
      avatarUrlInput,
      bannerUrlLabel,
      bannerUrlInput,
      bioLabel,
      bioInput,
      formButtons,
    );
    updateFormContainer.appendChild(form);
  }

  profileContainer.appendChild(bannerDiv);
  profileContainer.appendChild(avatarContainer);
  profileContainer.appendChild(profileDetailsDiv);
  profileContainer.appendChild(updateFormContainer);
}
