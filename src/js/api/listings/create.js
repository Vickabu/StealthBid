import { API_LISTINGS } from "../constant";
import { headers } from "../headers";

const MAX_MEDIA = 8;
let mediaCount = 0;

export function addMedia() {
  if (mediaCount >= MAX_MEDIA) {
    document.getElementById("mediaError").classList.remove("hidden");
    return;
  }

  const mediaContainer = document.getElementById("mediaContainer");
  const mediaItem = document.createElement("div");
  mediaItem.className = "media-item flex items-center space-x-2";
  mediaItem.innerHTML = `
    <input type="url" class="border p-2 w-full" placeholder="Enter image URL" maxlength="300" name="mediaUrl">
    <input type="text" class="border p-2 w-full" placeholder="Enter image alt text" maxlength="120" name="mediaAlt">
    <button type="button" class="bg-red-500 text-white p-2 rounded" onclick="removeMedia(this)">Remove</button>
  `;
  mediaContainer.appendChild(mediaItem);

  mediaCount++;
}

export function removeMedia(button) {
  button.parentElement.remove();
  mediaCount--;
}

export async function createListing({ title, body, tags = [], media = null }) {
  if (!title || !body) {
    throw new Error("Title and body are required.");
  }

  try {
    const response = await fetch(API_LISTINGS, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        title,
        body,
        tags,
        media: media ? media : null,
      }),
    });

    if (response.ok) {
      const { data } = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error(
        "Failed to create post:",
        response.status,
        response.statusText,
        errorData
      );
      throw new Error(
        `Error ${response.status}: ${errorData.message || "Unknown error"}`
      );
    }
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function onCreateListing(event) {
  event.preventDefault();

  const title = event.target.title.value.trim();
  const body = event.target.body.innerText.trim();
  const tags = event.target.tags.value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
  const mediaUrls = event.target.querySelectorAll("[name='mediaUrl']");
  const mediaAlts = event.target.querySelectorAll("[name='mediaAlt']");

  const media = [];
  mediaUrls.forEach((url, index) => {
    if (url.value && mediaAlts[index].value) {
      media.push({ url: url.value, alt: mediaAlts[index].value });
    }
  });

  try {
    await createListing({ title, body, tags, media });
    event.target.reset();
    document.getElementById("mediaContainer").innerHTML = "";
    mediaCount = 0;
    window.location.href = "/";
  } catch (error) {
    console.error("Error while creating:", error);
  }
}

document
  .getElementById("createPostForm")
  .addEventListener("submit", onCreateListing);

document.getElementById("addMediaButton").addEventListener("click", addMedia);
