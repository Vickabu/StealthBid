import { readProfile } from "../../api/profile/read";
import { displayProfileContent } from "../../components/profile/displayProfileContent";
import { displayUserListings } from "../../components/profile/displayUserListings";
import { hideLoader, showLoader } from "../../ui/global/loader";
import { fetchListing } from "../../api/listings/read";

export async function displayProfilePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("name");

  if (!userName) {
    console.error("Name not found in URL");
    return;
  }

  showLoader();
  try {
    const profileResponse = await readProfile(userName, true, true);
    const profileData = profileResponse.data;

    if (!profileData) {
      throw new Error("Invalid profile data structure");
    }

    const { listings, wins } = profileData;

    if (!listings || !wins) {
      throw new Error("Invalid listings or wins data structure");
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const loggedInUserName = userInfo?.name;

    displayProfileContent(profileData, userName, loggedInUserName);
    const detailedListings = await Promise.all(
      listings.map(async (listing) => {
        return await fetchListing(listing.id);
      }),
    );

    displayUserListings(detailedListings, wins, userName, loggedInUserName);
  } catch (error) {
    console.error("Error rendering profile page:", error);
    const profileContainer = document.getElementById("profile-container");
    profileContainer.innerHTML =
      "<p class='text-red-500 text-center mt-10'>Failed to load profile. Please try again later.</p>";
  } finally {
    hideLoader();
  }
}

displayProfilePage();
