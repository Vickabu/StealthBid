/**
 * Logs out the user and clears local storage.
 */
export function logout() {
  ["accessToken", "userInfo"].forEach((item) => localStorage.removeItem(item));
  alert("Logged out");
  window.location.href = "/";
}
