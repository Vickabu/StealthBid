import { API_LISTINGS } from "../../api/constant";
import { headers } from "../../api/headers";

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
    <button type="button" class="bg-red-500 text-white p-2 rounded">Remove</button>
  `;

  const removeButton = mediaItem.querySelector("button");
  removeButton.addEventListener("click", () => {
    removeMedia(removeButton);
  });

  mediaContainer.appendChild(mediaItem);
  mediaCount++;
}

export function removeMedia(button) {
  button.parentElement.remove();
  mediaCount--;
}

export async function createListing({
  title,
  description,
  tags = [],
  media = [],
  endsAt,
}) {
  if (!title || title.length < 1 || title.length > 280) {
    throw new Error("Title must be between 1 and 280 characters.");
  }

  if (description && description.length > 280) {
    throw new Error("Description cannot be longer than 280 characters.");
  }

  if (tags.length > 8 || tags.some((tag) => tag.length > 24)) {
    throw new Error(
      "Tags cannot be more than 8 and each tag cannot exceed 24 characters."
    );
  }

  if (media && media.length > 8) {
    throw new Error("You cannot have more than 8 media items.");
  }

  if (media && media.some((item) => !item.url || !item.alt)) {
    throw new Error("Each media item must have both a url and alt text.");
  }

  console.log("Sending data to API:", {
    title,
    description: description || "",
    tags,
    media: media || [],
    endsAt,
  });

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
    console.log("API response:", responseData);

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

export async function onCreateListing(event) {
  event.preventDefault();
  console.log("Submit clicked!");

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

  console.log("Collected media:", media);

  try {
    await createListing({ title, body, tags, endsAt, media });

    event.target.reset();
    document.getElementById("mediaContainer").innerHTML = "";
    mediaCount = 0;
    alert("Listing created successfully.");
    window.location.href = "/";
  } catch (error) {
    console.error("Error while creating:", error);
  }
}

document
  .getElementById("createPostForm")
  .addEventListener("submit", onCreateListing);

document.getElementById("addMediaButton").addEventListener("click", addMedia);
