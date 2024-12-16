import { API_LISTINGS } from "../constant";
import { headers } from "../headers";

/**
 * Deletes a listing by its unique identifier.
 *
 * This function sends a DELETE request to remove a listing from the system using its ID.
 * If the request is successful, it returns `true`; otherwise, it returns `false`.
 *
 * @param {string} id - The unique identifier of the listing to be deleted.
 *
 * @returns {Promise<boolean>} A promise that resolves to `true` if the listing was deleted successfully, or `false` if the deletion failed.
 *
 * @throws {Error} Throws an error if there is an issue with the fetch request or if the response is not successful.
 */

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
        response.statusText,
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting listing:", error);
    return false;
  }
}
