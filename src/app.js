import "./css/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import router from "./js/router";
import { createNavbarAndModal } from "./js/utils/navbar";
import { createFooter } from "./js/utils/footer";

async function runApp() {
  await router(window.location.pathname);
  createNavbarAndModal();
  createFooter();
}

runApp();
