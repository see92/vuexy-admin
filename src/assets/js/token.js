export const setToken = (obj) => {
  window.localStorage.setItem("userInfo", JSON.stringify(obj));
};
