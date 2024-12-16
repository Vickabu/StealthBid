import "./css/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import router from "./js/router";
import { createNavbarAndModal } from "./js/utils/navbar";
import { createFooter } from "./js/utils/footer";
import { mainStyles } from "./js/utils/styles";

window.toastr = toastr;

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: "5000",
};

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
