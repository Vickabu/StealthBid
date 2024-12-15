import "./css/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import router from "./js/router";
import { createNavbarAndModal } from "./js/utils/navbar";
import { createFooter } from "./js/utils/footer";
import { mainStyles } from "./js/utils/styles";

async function runApp() {
  document.body.classList.add("bg-lightGrey");
  await router(window.location.pathname);
  createNavbarAndModal();
  createFooter();

  const mainElement = document.querySelector("main");
  if (mainElement) {
    mainElement.classList.add(...mainStyles.container);
  }
}

runApp();
