import { API_LISTINGS } from "../constant";
import { headers } from "../headers";

export async function deleteListing(id) {
  try {
    const response = await fetch(`${API_LISTINGS}/${id}`, {
      method: "DELETE",
      headers: headers(),
    });

    if (!response.ok) {
      console.error(
        "Failed to delete listing:",
        response.status,
        response.statusText
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting listing:", error);
    return false;
  }
}

export async function onDeletePost(event) {
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
