// export function updateLoader(isVisible) {
//   if (isVisible) {
//     showLoader();
//   } else {
//     hideLoader();
//   }
// }

export function showLoader() {
  const loader = document.createElement("div");
  loader.id = "loader";

  loader.classList.add(
    "fixed",
    "top-0",
    "left-0",
    "w-full",
    "h-full",
    // "bg-white",
    // "bg-opacity-70",
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

// const style = document.createElement("style");
// style.innerHTML = `
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
// `;
// document.head.appendChild(style);
