export const setAccessTokenToLocalStorage = (accessToken) => {
  localStorage.setItem("SPECTOGETHER_AT", accessToken);
};
