export const mainStyles = {
  container: ["mb-10"],
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
    "z-50",
  ],
  container: [
    "flex",
    "flex-col",
    "items-start",
    "gap-2",
    "bg-softSteel",
    "border",
    "border-black",
    "rounded-sm",
    "p-6",
    "w-3/4",
    "md:w-1/2",
    "max-w-md",
    "font-secondary",
  ],
  header: ["flex", "justify-between", "items-center", "w-full", "mb-4"],
  logo: ["h-16", "mx-auto", "md:h-20"],
  closeButton: ["text-xl", "font-bold"],
};

export const tabStyles = {
  container: ["flex", "w-full", "justify-around", "mb-4"],
  tab: ["font-bold", "w-full", "text-sm", "md:text-lg"],
  activeTab: ["text-black", "border-b", "border-black"],
};

export const formStyles = {
  container: ["w-full", "p-2"],
  signInform: ["flex", "flex-col", "gap-4"],
  input: ["form-input", "p-2", "border", "rounded-sm", "text-sm", "md:text-lg"],
  errorMessage: ["text-center", "bg-mutedRose", "font-bold"],
  loginButton: [
    "bg-dustyTan",
    "py-2",
    "rounded-sm",
    "hover:bg-warmSand",
    "hover:underline",
    "font-bold",
    "border",
    "border-black",
    "text-sm",
    "md:text-lg",
  ],
};
