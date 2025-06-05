import { deleteListing } from "../../api/listings/delete";
import { showConfirmationModal } from "../../utils/confirmationModal";
import { hideLoader, showLoader } from "../global/loader";

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

  const btn = event.target;
  const listingId = btn.dataset.listingId;

  if (!listingId) {
    window.toastr.error("Listing ID mangler 😕");
    return;
  }

  const confirmed = await showConfirmationModal(
    "Are you sure you want to delete this listing?",
    "Yes, delete it",
    "Cancel",
  );

  if (!confirmed) {
    window.toastr.info("Deletion canceled.");
    return;
  }

  showLoader();

  try {
    await deleteListing(listingId);
    window.toastr.success("Listing deleted successfully 🎉");

    setTimeout(() => {
      window.history.back();
    }, 800);
  } catch (err) {
    window.toastr.error(
      err instanceof Error ? err.message : "Could not delete listing.",
    );
  } finally {
    hideLoader();
  }
}
