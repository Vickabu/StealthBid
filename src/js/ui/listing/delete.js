import { deleteListing } from "../../api/listings/delete";
import { showConfirmationModal } from "../../utils/confirmationModal";
import { hideLoader, showLoader } from "../../utils/loader";

/**
 * Handles the deletion of a listing.
 *
 * This function stops the propagation of the event, retrieves the listing ID
 * from the delete button, and prompts the user for confirmation using a custom modal.
 * If confirmed, it attempts to delete the listing and shows a success or error message.
 *
 * @param {Event} event - The click event on the delete button.
 */

export async function onDeleteListing(event) {
  event.stopPropagation();
  const deleteButton = event.target;
  const listingId = deleteButton.dataset.listingId;

  if (!listingId) {
    console.error("Listing ID not found.");
    return;
  }

  const confirmation = await showConfirmationModal(
    "Are you sure you want to delete this listing?",
    "Yes",
    "Cancel",
  );

  if (confirmation) {
    showLoader();
    try {
      const success = await deleteListing(listingId);
      if (success) {
        window.toastr.success("Listing deleted successfully.");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        window.toastr.error("Failed to delete the listing.");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      window.toastr.error("An error occurred while deleting the listing.");
    }
  } else {
    window.toastr.info("Listing deletion canceled.");
  }

  hideLoader();
}
