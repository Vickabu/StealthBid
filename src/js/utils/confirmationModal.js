/**
 * Shows a custom confirmation modal and returns the user's response.
 *
 * @param {string} message - The message to display in the modal.
 * @param {string} confirmText - The text to display on the confirmation button.
 * @param {string} cancelText - The text to display on the cancel button.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the user confirmed the action, otherwise `false`.
 */

export async function showConfirmationModal(
  message,
  confirmText = "Yes",
  cancelText = "No",
) {
  return new Promise((resolve) => {
    const modal = document.createElement("div");
    modal.classList.add(
      "fixed",
      "top-0",
      "left-0",
      "w-full",
      "h-full",
      "bg-opacity-50",
      "bg-black",
      "border",
      "border-deepTeal",
      "text-center",
      "font-semibold",
    );

    const modalContent = document.createElement("div");
    modalContent.classList.add(
      "bg-lightGrey",
      "p-6",
      "rounded-sm",
      "w-1/2",
      "mx-auto",
      "mt-40",
    );

    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    modalContent.appendChild(messageElement);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add(
      "flex",
      "justify-center",
      "space-x-4",
      "mt-4",
    );

    const confirmButton = document.createElement("button");
    confirmButton.textContent = confirmText;
    confirmButton.classList.add(
      "px-6",
      "py-2",
      "bg-red-600",
      "hover:bg-red-500",
      "hover:underline",
      "text-white",
      "rounded-sm",
      "border",
      "border-black",
    );
    buttonContainer.appendChild(confirmButton);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = cancelText;
    cancelButton.classList.add(
      "px-4",
      "py-2",
      "bg-gray-300",
      "hover:bg-gray-200",
      "hover:underline",
      "text-black",
      "rounded-sm",
      "border",
      "border-black",
    );
    buttonContainer.appendChild(cancelButton);

    modalContent.appendChild(buttonContainer);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    confirmButton.addEventListener("click", () => {
      resolve(true);
      modal.remove();
    });

    cancelButton.addEventListener("click", () => {
      resolve(false);
      modal.remove();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        resolve(false);
        modal.remove();
      }
    });
  });
}
