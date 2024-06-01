export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user))
}

export function getUserFromLocalStorage() {
  try {
    return JSON.parse(window.localStorage.getItem("user"))
  } catch (error) {
    return null
  }
}

export function removeUserFromLocalStorage() {
  window.localStorage.removeItem("user")
}

String.prototype.sanitize = function () {
  return this
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("/", "&sol;")
}
