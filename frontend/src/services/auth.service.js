import axios from "axios";
import { AUTH_URL } from "../constants/constants";

const signUp = async (username, password) => {
  return await axios
    .post(AUTH_URL + "signup", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const login = (username, password) => {
  return axios
    .post(AUTH_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signUp,
  login,
  logout,
  getCurrentUser,
};

export default authService;