import { updateProfile } from "../../api/profile/update";

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

  try {
    await updateProfile(updatedProfile, userName);
    alert("Profile updated successfully!");
    if (refreshProfile) refreshProfile();
  } catch (error) {
    alert("Failed to update profile. Please try again.");
    console.error("Error updating profile:", error);
  }
}
