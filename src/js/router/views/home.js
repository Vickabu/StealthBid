import { displayListings } from "../../components/listings/displayListings";
import { openAuthModal } from "../../components/auth/authModal";

const getStartedButton = document.getElementById("open-login-register");
const isLoggedIn = localStorage.getItem("userInfo");

if (isLoggedIn) {
  getStartedButton.style.display = "none";
}

if (getStartedButton) {
  getStartedButton.addEventListener("click", () => {
    openAuthModal();
  });
} else {
  console.error("Button with ID 'open-login-register' not found!");
}

displayListings();
