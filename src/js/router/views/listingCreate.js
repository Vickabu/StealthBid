import { addMedia } from "../../utils/mediaHandler";
import { onCreateListing } from "../../ui/listing/create";

document
  .getElementById("createListingForm")
  .addEventListener("submit", onCreateListing);

document.getElementById("addMediaButton").addEventListener("click", addMedia);
