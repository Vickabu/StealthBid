export function displayPagination(totalPages, currentPage, onPageChange) {
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  paginationContainer.classList.add(
    "flex",
    "justify-center",
    "items-center",
    "space-x-4",
  );

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("flex", "items-center", "space-x-4");

  if (currentPage > 1) {
    const firstPageButton = document.createElement("button");
    const firstPageIcon = document.createElement("i");
    firstPageIcon.classList.add("fas", "fa-angle-double-left");
    firstPageButton.appendChild(firstPageIcon);
    firstPageButton.classList.add(
      "px-4",
      "py-2",
      "border",
      "rounded-sm",
      "hover:border-softSteel",
    );
    firstPageButton.onclick = () => onPageChange(1);
    buttonContainer.appendChild(firstPageButton);

    const prevPageButton = document.createElement("button");
    const prevPageIcon = document.createElement("i");
    prevPageIcon.classList.add("fas", "fa-angle-left");
    prevPageButton.appendChild(prevPageIcon);
    prevPageButton.classList.add(
      "px-4",
      "py-2",
      "border",
      "rounded-sm",
      "hover:border-softSteel",
    );
    prevPageButton.onclick = () => onPageChange(currentPage - 1);
    buttonContainer.appendChild(prevPageButton);
  }

  const pageIndicator = document.createElement("span");
  pageIndicator.textContent = `Side ${currentPage} / ${totalPages}`;
  pageIndicator.classList.add("font-semibold", "text-gray-700");
  buttonContainer.appendChild(pageIndicator);

  if (currentPage < totalPages) {
    const nextPageButton = document.createElement("button");
    const nextPageIcon = document.createElement("i");
    nextPageIcon.classList.add("fas", "fa-angle-right");
    nextPageButton.appendChild(nextPageIcon);
    nextPageButton.classList.add(
      "px-4",
      "py-2",
      "border",
      "rounded-sm",
      "hover:border-softSteel",
    );
    nextPageButton.onclick = () => onPageChange(currentPage + 1);
    buttonContainer.appendChild(nextPageButton);

    const lastPageButton = document.createElement("button");
    const lastPageIcon = document.createElement("i");
    lastPageIcon.classList.add("fas", "fa-angle-double-right");
    lastPageButton.appendChild(lastPageIcon);
    lastPageButton.classList.add(
      "px-4",
      "py-2",
      "border",
      "rounded-sm",
      "hover:border-softSteel",
    );
    lastPageButton.onclick = () => onPageChange(totalPages);
    buttonContainer.appendChild(lastPageButton);
  }

  paginationContainer.appendChild(buttonContainer);
}
