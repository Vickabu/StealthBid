import { createNavbarAndModal } from "../utils/navbar.js";

export default async function router(pathname = window.location.pathname) {
  createNavbarAndModal();

  switch (pathname) {
    case "/":
      await import("./views/home.js");
      break;
    // case "/auth/":
    //   await import("./views/auth.js");
    //   break;
    case "/listing/":
      await import("./views/listing.js");
      break;
    // case "/post/edit/":
    //   await import("./views/postEdit.js");
    //   break;
    // case "/post/create/":
    //   await import("./views/postCreate.js");
    //   break;
    // case "/profile/":
    //   await import("./views/profile.js");
    //   break;
    // default:
    //   await import("./views/notFound.js");
  }
}
