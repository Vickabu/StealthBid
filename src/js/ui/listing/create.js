import { createListing } from "../../api/listings/create";
import { hideLoader, showLoader } from "../global/loader";
import { validateField } from "../../utils/validate";

/**
 * Handles the process of creating a new listing.
 * Validates form input, sends a request to the API, and handles success or failure.
 *
 * @async
 * @param {Event} event - The submit event triggered when the form is submitted.
 * @returns {void}
 * @throws {Error} If the API request fails or if validation errors occur.
 */

export async function onCreateListing(event) {
  event.preventDefault();

  const title = event.target.title.value.trim();
  const description = document.getElementById("textarea").innerText.trim();
  const tags = event.target.tags.value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
  const endsAt = event.target.endsAt.value.trim();

  const fields = [
    { id: "title", value: title, type: "title" },
    { id: "description", value: description, type: "description" },
    { id: "tags", value: tags, type: "tags" },
    { id: "endsAt", value: endsAt, type: "endsAt" },
  ];

  let validationError = false;

  fields.forEach((field) => {
    const errorElement = document.getElementById(`${field.id}Error`);
    const inputElement = document.getElementById(field.id);

    if (errorElement) {
      errorElement.classList.add("hidden");
    }
    if (inputElement) {
      inputElement.classList.remove("error");
    }
  });

  for (const field of fields) {
    const errorMessage = validateField(field.value, field.type);
    const errorElement = document.getElementById(`${field.id}Error`);
    const inputElement = document.getElementById(field.id);

    if (errorMessage) {
      if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.remove("hidden");
      }
      if (inputElement) {
        inputElement.classList.add("error");
      }

      validationError = true;
    }
  }

  if (validationError) {
    return;
  }

  const mediaUrls = event.target.querySelectorAll("[name='mediaUrl']");
  const media = Array.from(mediaUrls)
    .filter((url) => url.value)
    .map((url) => ({ url: url.value, alt: "product image" }));

  try {
    showLoader();
    await createListing({
      title,
      description,
      tags,
      endsAt,
      media,
    });

    event.target.reset();
    document.getElementById("mediaContainer").innerHTML = "";
    toastr.success("Listing created successfully.");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.error("Error while creating:", error);
  } finally {
    hideLoader();
  }
}
