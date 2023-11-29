import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (gmail, password, profileName) => {
  return axios.post(API_URL + "signup", {
    gmail,
    password,
    profileName,
  });
};

const login = (gmail, password) => {
  return axios
    .post(API_URL + "signin", {
      gmail,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  window.sessionStorage.removeItem('user');
};

const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
  return JSON.parse(sessionStorage.getItem("user"));
  }
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;