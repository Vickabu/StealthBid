/**
 * Logs out the user by removing authentication-related data from local storage,
 * and redirects the user to the homepage or reloads the current page.
 * If the user is on the profile page, they are redirected to the homepage.
 * Displays a toastr success message indicating the logout.
 *
 * @function
 * @example
 * // Example usage:
 * logout(); // Logs the user out and redirects accordingly.
 */

export function logout() {
  ["accessToken", "userInfo", "isLoggedIn"].forEach((item) =>
    localStorage.removeItem(item),
  );
  window.toastr.success("You have been logged out.", "Logged Out");
  setTimeout(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes("/profile")) {
      window.location.href = "/";
    } else {
      window.location.reload();
    }
  }, 1000);
}
