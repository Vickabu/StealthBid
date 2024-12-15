export const navbarStyles = {
  container: [
    "w-full",
    "bg-deepTeal",
    "text-white",
    "px-4",
    "py-2",
    "font-secondary",
    "md:text-lg",
  ],
  innerContainer: [
    "max-w-screen-xl",
    "mx-auto",
    "flex",
    "items-center",
    "justify-between",
    "mt-auto",
  ],
  logo: ["max-h-14", "cursor-pointer"],
  loginButton: [
    "bg-dustyTan",
    "py-2",
    "px-4",
    "rounded-sm",
    "text-black",
    "hover:bg-warmSand",
    "hover:underline",
    "font-bold",
    "border",
    "border-black",
  ],
  avatarButton: ["flex", "items-center", "space-x-2", "p4"],
  avatarImage: ["w-10", "h-10", "rounded-full", "object-cover"],
  credits: ["text-sm", "font-semibold"],
  links: ["py-2", "px-4", "rounded-sm", "hover:border-b", "mt-auto"],
  logoutButton: [
    "bg-mutedRose",
    "text-black",
    "py-2",
    "px-4",
    "rounded-sm",
    "hover:bg-[#B16E6E]",
    "hover:underline",
    "font-bold",
    "border",
    "border-black",
  ],
};

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
