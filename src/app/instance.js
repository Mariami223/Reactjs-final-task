import axios from "axios";
import { checkTokenValidity } from "./util";
import decode from "jwt-decode";

export const instance = axios.create({
  baseURL: "http://localhost:3001/",
});

instance.interceptors.request.use(async (req) => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refresh_token");
  // token doesn't exist
  if (!token) return req;
  // token exists

  req.headers.Authorization = `Bearer ${token}`;
  const expirationDate = decode(token).exp;
  // check if token is expired
  const isExpired = expirationDate * 1000 < new Date().getTime();

  if (!isExpired) return req;
  // if token is expired send request to refresh access token with existing refresh token
  const response = await axios.post("http://localhost:3001/users/refresh", {
    refresh_token: refreshToken,
  });

  //  save new token to localstorage
  localStorage.setItem("token", response.data.token);
  // set new token to Authorization header,so api can use it
  req.headers.Authorization = `Bearer ${response.data.token}`;
  return req;
});
