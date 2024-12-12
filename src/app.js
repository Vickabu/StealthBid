import "./css/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import router from "./js/router";
import { createNavbarAndModal } from "./js/utils/navbar"; // Importer navbar-funksjonen

async function runApp() {
  await router(window.location.pathname);
  createNavbarAndModal();
}

runApp();
