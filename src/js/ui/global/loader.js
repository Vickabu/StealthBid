export function showLoader() {
  const loader = document.createElement("div");
  loader.id = "loader";

  loader.classList.add(
    "fixed",
    "top-0",
    "left-0",
    "w-full",
    "h-full",
    "flex",
    "justify-center",
    "items-center",
    "z-50",
  );

  const spinner = document.createElement("div");
  spinner.classList.add(
    "border-4",
    "border-lightGrey",
    "border-t-4",
    "border-t-deepTeal",
    "rounded-full",
    "w-12",
    "h-12",
    "animate-spin",
  );
  loader.appendChild(spinner);
  document.body.appendChild(loader);
}

export function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.remove();
  }
}
