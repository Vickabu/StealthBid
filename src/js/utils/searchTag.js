export function showSearchTag(query) {
  const searchTagContainer = document.getElementById("search-tag-container");
  searchTagContainer.innerHTML = "";
  searchTagContainer.classList.add(
    "justify-between",
    "bg-red-500",
    "rounded-sm",
    "px-3",
    "py-2",
    "flex",
  );

  const searchTag = document.createElement("div");
  searchTag.classList.add("font-bold");
  searchTag.textContent = query;

  const removeTagButton = document.createElement("button");
  removeTagButton.textContent = "×";
  removeTagButton.classList.add("pr-2");
  removeTagButton.onclick = () => {
    searchTagContainer.innerHTML = "";
    document.getElementById("search-bar").value = "";
  };

  searchTagContainer.append(removeTagButton, searchTag);
}
