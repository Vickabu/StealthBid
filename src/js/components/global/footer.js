export function createFooter() {
  const footer = document.querySelector("footer");
  footer.classList.add(
    "w-full",
    "bg-deepTeal",
    "py-6",
    "px-6",
    "flex",
    "flex-col",
    "items-center",
  );

  const contentContainer = document.createElement("div");
  contentContainer.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "max-w-screen-xl",
    "w-full",
  );

  const logoContainer = document.createElement("div");
  logoContainer.classList.add(
    "flex",
    "items-center",
    "justify-start",
    "w-full",
  );

  const logo = document.createElement("img");
  logo.src = "/BrightLogo.png";
  logo.alt = "Logo";
  logo.classList.add("h-20");
  logoContainer.appendChild(logo);
  const hr = document.createElement("hr");
  hr.classList.add("my-4", "border-gray-300", "w-full", "border-t-2");

  const footerText = document.createElement("p");
  footerText.textContent = "©StealthBid.";
  footerText.classList.add("text-white", "text-sm", "w-full");

  contentContainer.appendChild(logoContainer);
  contentContainer.appendChild(hr);
  contentContainer.appendChild(footerText);
  footer.appendChild(contentContainer);

  const body = document.querySelector("body");
  body.appendChild(footer);
}
