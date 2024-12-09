import { API_LISTINGS } from "../../api/constant";
import { headers } from "../../api/headers";
import { validateField } from "../../utils/validate";

export async function createListing({
  title,
  description,
  tags = [],
  media = [],
  endsAt,
}) {
  validateField(title, "title");
  validateField(description, "description");
  validateField(tags, "tags");
  validateField(media, "media");

  try {
    const response = await fetch(API_LISTINGS, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        title,
        description: description || "",
        tags,
        media,
        endsAt,
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData.data;
    } else {
      console.error("API Error Response:", responseData);
      throw new Error(
        `Error ${response.status}: ${responseData.message || "Unknown error"}`
      );
    }
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}
