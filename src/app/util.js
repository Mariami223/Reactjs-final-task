import decode from "jwt-decode";

export const getUser = () => {
  const token = localStorage.getItem("token");
  return token ? decode(token) : null;
};

export const checkTokenValidity = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const expirationDate = getUser().exp;
  const isExpired = expirationDate * 1000 < new Date().getTime();
  return isExpired;
};

export const isUserAdmin = () => {
  const user = getUser();
  if (!user) return null;
  return user.role.includes("admin");
};
