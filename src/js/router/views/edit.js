// import { removeMedia } from "./listingCreate";
// import { API_LISTINGS } from "../../api/constant";
// import { headers } from "../../api/headers";

// // Get listing ID from URL
// const urlParams = new URLSearchParams(window.location.search);
// const listingId = urlParams.get("id");
// console.log("Fetching listing with ID:", listingId);

// // Fetch listing data by ID
// fetch(`/api/listings/${listingId}?t=${new Date().getTime()}`)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Failed to fetch listing data");
//     }
//     return response.json();
//   })
//   .then((listingData) => {
//     console.log("Listing data fetched:", listingData); // Check the fetched data in console
//     populateEditForm(listingData);
//   })
//   .catch((error) => {
//     console.error("Error loading listing data:", error); // Log any errors here
//   });

// // Function to populate the edit form
// function populateEditForm(listing) {
//   // Populate title field
//   const editTitle = document.getElementById("editTitle");
//   if (editTitle) editTitle.value = listing.title;

//   // Populate description field (contenteditable element)
//   const editBody = document.getElementById("editEditor");
//   if (editBody) editBody.innerText = listing.description || ""; // Ensure description is filled in

//   // Populate tags field
//   const editTags = document.getElementById("editTags");
//   if (editTags) editTags.value = listing.tags.join(", ");

//   // Populate deadline field
//   const editEndsAt = document.getElementById("editEndsAt");
//   if (editEndsAt) editEndsAt.value = listing.endsAt;

//   // Populate media container
//   const mediaContainer = document.getElementById("editMediaContainer");
//   if (mediaContainer) {
//     mediaContainer.innerHTML = ""; // Clear existing media items if any
//     listing.media.forEach((mediaItem) => {
//       const mediaItemElement = document.createElement("div");
//       mediaItemElement.classList.add(
//         "media-item",
//         "flex",
//         "items-center",
//         "space-x-2"
//       );

//       const urlInput = document.createElement("input");
//       urlInput.type = "url";
//       urlInput.classList.add("border", "p-2", "w-full");
//       urlInput.value = mediaItem.url;
//       urlInput.placeholder = "Enter image URL";
//       urlInput.maxLength = 300;
//       urlInput.name = "mediaUrl";

//       const removeButton = document.createElement("button");
//       removeButton.type = "button";
//       removeButton.classList.add("bg-red-500", "text-white", "p-2", "rounded");
//       removeButton.textContent = "Remove";

//       // Remove media item
//       removeButton.addEventListener("click", () => removeMedia(removeButton));

//       mediaItemElement.append(urlInput, removeButton);
//       mediaContainer.appendChild(mediaItemElement);
//     });
//   }

//   // Make sure the form is visible
//   const editListingForm = document.getElementById("editListingForm");
//   if (editListingForm) {
//     editListingForm.classList.remove("hidden");
//   }
// }

// // Wait for the DOM to be fully loaded before adding event listeners
// document.addEventListener("DOMContentLoaded", () => {
//   // Handle form submission
//   const editListingForm = document.getElementById("editListingForm");
//   if (editListingForm) {
//     editListingForm.addEventListener("submit", async function (event) {
//       event.preventDefault();

//       const title = event.target.title.value.trim();
//       const description = document
//         .getElementById("editEditor")
//         .innerText.trim();
//       const tags = event.target.tags.value.split(",").map((tag) => tag.trim());
//       const endsAt = event.target.endsAt.value;

//       const mediaUrls = event.target.querySelectorAll("[name='mediaUrl']");
//       const media = [];

//       mediaUrls.forEach((url) => {
//         if (url.value) {
//           media.push({ url: url.value, alt: "product image" });
//         }
//       });

//       try {
//         await updateListing({ title, description, tags, endsAt, media });
//         alert("Listing updated successfully.");
//         window.location.href = `/listing/?id=${listingId}`; // Redirect to the updated listing page
//       } catch (error) {
//         console.error("Error updating listing:", error);
//       }
//     });
//   }
// });

// // Function to update the listing
// async function updateListing({ title, description, tags, endsAt, media }) {
//   const response = await fetch(`${API_LISTINGS}/${listingId}`, {
//     method: "PUT",
//     headers: headers(),
//     body: JSON.stringify({
//       title,
//       description,
//       tags,
//       media,
//       endsAt,
//     }),
//   });

//   const responseData = await response.json();
//   if (response.ok) {
//     console.log("Listing updated:", responseData);
//   } else {
//     console.error("Error updating listing:", responseData);
//     throw new Error(responseData.message || "Failed to update listing");
//   }
// }
