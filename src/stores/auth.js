import { defineStore } from "pinia";
import api from "@/api/axios";
import router from "@/router/index";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
    accessToken: null,
    returnURL: null,
    returnURLParams: null,
  }),
  getters: {
    authenticated() {
      if (this.accessToken && this.user) {
        return true;
      }
      return false;
    },
    role() {
      return this.user.role;
    },
  },
  actions: {
    async login(credentials) {
      const response = await api.post("users/login/", credentials);
      await this.attempt(response.data.accessToken);
    },
    async attempt(token) {
      if (token) {
        localStorage.setItem("accessToken", token);
        this.accessToken = token;
      }

      const storageToken = localStorage.getItem("accessToken");
      this.accessToken = storageToken;

      if (!this.accessToken) {
        return;
      }

      try {
        const response = await api.get("/users/me/");
        this.user = response.data;
      } catch (e) {
        localStorage.removeItem("accessToken");
        this.user = null;
      }
    },
    logout() {
      router.push("/login");
      this.user = null;
      localStorage.removeItem("accessToken");
    },
  },
});
