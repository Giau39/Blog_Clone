import axios from "axios";
import store from "./store/index";
import router from "./router";

const Api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let x = false;
Api.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !x) {
      x = true;
      await store.dispatch("Logout");
      router.push("/login")
    }

  }
);

export default Api;
