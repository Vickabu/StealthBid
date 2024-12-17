const MAX_MEDIA = 8;
let mediaCount = 0;

const mediaContainer = document.getElementById("mediaContainer");
const mediaError = document.getElementById("mediaError");
const DEFAULT_ALT_TEXT = "product image";

/**
 * Toggles the visibility of the media error message.
 * @param {boolean} show - Determines whether to show or hide the error message.
 */

export function toggleMediaError(show) {
  mediaError.classList.toggle("hidden", !show);
}

/**
 * Adds a new media item (input field and preview) to the media container.
 * If the maximum media count is reached, an error message is shown.
 * The function also tracks and updates the media count.
 */
export function addMedia() {
  if (mediaCount >= MAX_MEDIA) {
    toggleMediaError(true);
    return;
  }

  toggleMediaError(false);

  const mediaItem = document.createElement("div");
  mediaItem.className = "media-item flex items-center space-x-4";

  const urlInput = document.createElement("input");
  urlInput.type = "url";
  urlInput.className = "border p-2 w-full";
  urlInput.placeholder = "Enter image URL";
  urlInput.maxLength = 300;
  urlInput.name = "mediaUrl";

  const previewContainer = document.createElement("div");
  previewContainer.className =
    "w-24 h-24 flex-shrink-0 border rounded overflow-hidden";
  previewContainer.style.display = "none";

  const previewImage = document.createElement("img");
  previewImage.className = "w-full h-full object-cover";
  previewContainer.appendChild(previewImage);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "bg-red-500 text-white p-2 rounded";
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    mediaItem.remove();
    mediaCount--;
    toggleMediaError(false);
  });

  urlInput.addEventListener("input", () => {
    const url = urlInput.value.trim();
    if (url) {
      previewImage.src = url;
      previewImage.alt = DEFAULT_ALT_TEXT;
      previewContainer.style.display = "block";
    } else {
      previewContainer.style.display = "none";
    }
  });

  mediaItem.append(previewContainer, urlInput, removeButton);
  mediaContainer.appendChild(mediaItem);

  mediaCount++;
}
