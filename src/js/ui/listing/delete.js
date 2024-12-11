import { deleteListing } from "../../api/listings/delete";

export async function onDeleteListing(event) {
  event.stopPropagation();
  const deleteButton = event.target;
  const listingId = deleteButton.dataset.listingId;

  if (!listingId) {
    console.error("Listing ID not found.");
    return;
  }

  if (confirm("Are you sure you want to delete this listing?")) {
    const success = await deleteListing(listingId);

    if (success) {
      alert("Listing deleted successfully.");
      window.location.href = "/";
    } else {
      alert("Failed to delete the listing.");
    }
  }
}
