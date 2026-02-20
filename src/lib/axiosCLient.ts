"use client";

import axios from "axios";
import { signOut } from "next-auth/react";
import { useAuthStore } from "@/store/authStore";
import { handleLogout } from "./signOutCustom";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("masuk interceptors axiosClient", error);
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        const newToken = session?.user?.accessToken;

        if (newToken) {
          useAuthStore.getState().setToken(newToken);
          axiosClient.defaults.headers.common["Authorization"] = `${newToken}`;
          originalRequest.headers["Authorization"] = `${newToken}`;
          return axiosClient(originalRequest);
        } else {
          handleLogout();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        handleLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
