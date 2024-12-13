import { API_AUCTION_PROFILES } from "../constant";
import { headers } from "../headers";

export async function updateProfile(profileData, userName) {
  try {
    // Legg til userName i URL-en
    const url = `${API_AUCTION_PROFILES}/${userName}`; // Bygg URL-en med brukernavnet

    const response = await fetch(url, {
      method: "PUT",
      headers: headers(), // Bruker headers funksjonen som setter Authorization
      body: JSON.stringify(profileData), // Sender profilendringer
    });

    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

export async function onUpdateProfile(event, userName, refreshProfile) {
  event.preventDefault();

  const form = event.target;
  const avatarUrl = form.querySelector("[name='avatarUrl']").value || "";
  const bannerUrl = form.querySelector("[name='bannerUrl']").value || "";
  const bio = form.querySelector("[name='bio']").value || "";
  const updatedProfile = {
    avatar: { url: avatarUrl },
    banner: { url: bannerUrl },
    bio: bio,
  };

  console.log("Updated Profile Data:", updatedProfile);

  try {
    await updateProfile(updatedProfile, userName);
    alert("Profile updated successfully!");
    if (refreshProfile) refreshProfile();
  } catch (error) {
    alert("Failed to update profile. Please try again.");
    console.error("Error updating profile:", error);
  }
}
