export function displayPagination(totalPages, currentPage, onPageChange) {
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.disabled = i === currentPage;
    button.onclick = () => onPageChange(i);
    paginationContainer.appendChild(button);
  }
}
