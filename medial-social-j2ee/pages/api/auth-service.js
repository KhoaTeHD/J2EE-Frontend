import axios from "axios";
import authHeader from "./auth-header";
// import { useRouter } from "next/router";
const API_URL = "http://localhost:8080/api/auth/";
// const router = useRouter();
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
  sessionStorage.removeItem('user');
  // return axios
  //   .post(API_URL + "logout", { headers: authHeader() })
  //   .then((response) => {
  //     if (response.data.success) {
  //       sessionStorage.removeItem("user");
  //     }
  //     return response.data;
  //   });
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