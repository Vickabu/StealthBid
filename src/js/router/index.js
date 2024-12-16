export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("./views/home.js");
      break;
    case "/profile/":
      await import("./views/profile.js");
      break;
    case "/listing/":
      await import("./views/listing.js");
      break;
    case "/listing/create/":
      await import("./views/listingCreate.js");
      break;
  }
}
