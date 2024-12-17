/**
 * Creates and appends a footer to the document with a logo, a horizontal rule, and footer text.
 * The footer is styled with utility classes for layout and appearance.
 *
 * @function createFooter
 * @returns {void} This function does not return a value. It directly manipulates the DOM to append a footer element.
 *
 * @description
 * The function creates a footer element and applies the following structure:
 * - A container div for the footer content.
 * - A logo image with a specified source and alternative text.
 * - A horizontal rule (`<hr>`) for separating sections.
 * - Footer text indicating copyright information.
 *
 * The footer is styled using Tailwind CSS utility classes for layout and design.
 */

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
}
