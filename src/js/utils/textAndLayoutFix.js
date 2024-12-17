/**
 * Applies the appropriate word-breaking class to an element based on its text content.
 * If any word in the element's text is longer than 60 characters, the "break-all" class
 * will be applied. Otherwise, the "break-words" class will be applied.
 *
 *
 * @param {HTMLElement} element - The element whose text content will be evaluated to determine the word-breaking class.
 */

export function applyBreakWordClass(element) {
  const words = element.textContent.split(" ");
  const hasLongWord = words.some((word) => word.length > 60);

  if (hasLongWord) {
    element.classList.add("break-all");
  } else {
    element.classList.add("break-words");
  }
}
