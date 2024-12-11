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
