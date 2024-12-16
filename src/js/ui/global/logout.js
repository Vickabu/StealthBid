/**
 * Logs out the user by removing authentication-related data from local storage
 * and redirects the user to the homepage.
 * It also displays a toastr success message indicating the logout.
 */

export function logout() {
  ["accessToken", "userInfo", "isLoggedIn"].forEach((item) =>
    localStorage.removeItem(item),
  );
  window.toastr.success("You have been logged out.", "Logged Out");
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
}
