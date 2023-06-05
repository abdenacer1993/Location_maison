import { ILocalUser } from "../models/user";

export const login = (userData: ILocalUser) => {
  window.localStorage.setItem("user", JSON.stringify(userData));
};
export const logout = () => {
  window.localStorage.removeItem("user");
  window.location.reload();
};

export const isLoggedIn = () => {
  const storage = window.localStorage.getItem("user");
  if (!storage) return false;
  let user: ILocalUser;
  user = JSON.parse(storage);
  return user.email != "";
};
export const isAdmin = () => {
  const storage = window.localStorage.getItem("user");
  if (!storage) return false;
  let user: ILocalUser;
  user = JSON.parse(storage);
  return localStorage.getItem('Role') === "admin";
};
export const isSimpleAdmin = () => {
  const storage = window.localStorage.getItem("simpleAdmin");
  if (!storage) return false;
  let user: ILocalUser;
  user = JSON.parse(storage);
  return localStorage.getItem('Role') === "admin";
};

export const isUser = () => {
  const storage = window.localStorage.getItem("user");
  if (!storage) return false;
  let user: ILocalUser;
  user = JSON.parse(storage);
  return localStorage.getItem('Role') === "user";
};

export const getRole = () => {
  const storage = window.localStorage.getItem("user");
  if (!storage) return "";
  let user: ILocalUser;
  user = JSON.parse(storage);
  return user.role;
};
export const getLocalUser = () => {
  const storage = window.localStorage.getItem("user");
  if (!storage) return;
  let user: ILocalUser = JSON.parse(storage);
  return user;
};
