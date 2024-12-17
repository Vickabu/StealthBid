import { displayListings } from "../components/listings/displayListings";

export function showSearchTag(query) {
  const searchTagContainer = document.getElementById("search-tag-container");

  searchTagContainer.innerHTML = "";
  searchTagContainer.classList.add(
    "justify-between",
    "px-3",
    "py-2",
    "flex",
    "bg-softSteel",
    "rounded-sm",
  );

  const searchTag = document.createElement("div");
  searchTag.classList.add("font-bold", "pr-2");
  searchTag.textContent = query;

  const removeTagButton = document.createElement("button");

  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-times");
  removeTagButton.appendChild(icon);
  removeTagButton.classList.add("pr-4");
  removeTagButton.onclick = () => {
    searchTagContainer.classList.remove("bg-softSteel");
    searchTagContainer.innerHTML = "";
    document.getElementById("search-bar").value = "";
    displayListings("");
  };

  searchTagContainer.append(removeTagButton);
  searchTagContainer.appendChild(searchTag);
}
