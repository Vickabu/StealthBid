import { toggleMediaError } from "../../utils/mediaHandler";
import { createListing } from "../../api/listings/create";
import { hideLoader, showLoader } from "../../utils/loader";

export async function onCreateListing(event) {
  event.preventDefault();

  const title = event.target.title.value.trim();
  const body = document.getElementById("editor").innerText.trim();

  const tags = event.target.tags.value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  const endsAt = event.target.endsAt.value;

  const mediaUrls = event.target.querySelectorAll("[name='mediaUrl']");

  const media = [];
  mediaUrls.forEach((url, index) => {
    console.log(`Processing media ${index + 1}: URL = ${url.value}`);
    if (url.value) {
      media.push({
        url: url.value,
        alt: "product image",
      });
    }
  });

  try {
    showLoader();
    await createListing({ title, description: body, tags, endsAt, media });

    event.target.reset();
    document.getElementById("mediaContainer").innerHTML = "";
    toggleMediaError(document.getElementById("mediaError"), false);
    alert("Listing created successfully.");
    window.location.href = "/";
  } catch (error) {
    console.error("Error while creating:", error);
  } finally {
    hideLoader();
  }
}
