const MAX_MEDIA = 8;
let mediaCount = 0;

const mediaContainer = document.getElementById("mediaContainer");
const mediaError = document.getElementById("mediaError");
const DEFAULT_ALT_TEXT = "product image";

export function toggleMediaError(show) {
  mediaError.classList.toggle("hidden", !show);
}

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

// export function removeMedia(button) {
//   button.parentElement.remove();
//   mediaCount--;
// }
