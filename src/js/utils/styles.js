export const navbarStyles = {
  container: [
    "flex",
    "items-center",
    "justify-between",
    "p-4",
    "bg-deepTeal",
    "text-white",
  ],
  logo: ["max-h-14"],
  loginButton: [
    "bg-dustyTan",
    "py-2",
    "px-4",
    "rounded-sm",
    "text-black",
    "hover:bg-warmSand",
  ],
};

export const modalStyles = {
  overlay: [
    "fixed",
    "inset-0",
    "flex",
    "items-center",
    "justify-center",
    "bg-black",
    "bg-opacity-50",
  ],

  container: [
    "flex",
    "flex-col",
    "items-start",
    "gap-2",
    "bg-softSteel",
    "border",
    "border-black",
    "rounded",
    "p-4",
  ],
  header: ["flex", "justify-between", "items-center", "w-full", "mb-4"],
  logo: ["h-20", "mx-auto"],
  closeButton: ["text-xl", "font-bold"],
};

export const tabStyles = {
  container: ["flex", "w-full", "justify-around", "mb-4"],
  tab: ["font-bold", "text-gray-500"],
  activeTab: ["text-black"],
};

export const formStyles = {
  container: ["w-full", "p-4"],
  form: ["flex", "flex-col", "gap-2"],
  input: ["form-input", "p-2", "border", "rounded"],
  submitButton: ["bg-deepTeal", "text-white", "py-2", "rounded-sm"],
};
