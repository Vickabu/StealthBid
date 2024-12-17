import { updateProfile } from "../../api/profile/update";
import { hideLoader, showLoader } from "../global/loader";

/**
 * Handles profile update when the form is submitted.
 *
 * Collects updated profile data (avatar, banner, bio) from the form, calls `updateProfile`
 * to update the server, and shows success or error notifications using toastr.
 * If successful, the profile is refreshed if `refreshProfile` is provided.
 *
 * @param {Event} event - The form submit event.
 * @param {string} userName - The user's username.
 * @param {function} [refreshProfile] - Optional callback to refresh the profile after update.
 *
 * @returns {void}
 *
 * @example
 * onUpdateProfile(event, 'user123', refreshProfileCallback);
 */

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
    showLoader();
    await updateProfile(updatedProfile, userName);
    window.toastr.success("Profile updated successfully!");
    if (refreshProfile) refreshProfile();
    hideLoader();
  } catch (error) {
    window.toastr.error("Failed to update profile. Please try again.");
    console.error("Error updating profile:", error);
  }
}
