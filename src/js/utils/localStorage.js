export function getLocalStorage() {
  const userInfo = localStorage.getItem("userInfo");

  if (userInfo) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo;
  }
}
