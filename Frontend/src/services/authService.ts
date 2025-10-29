import axiosInstance from "./axoisInstance";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export const loginUser = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/user/login", payload);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    // (Optional) Tell backend to invalidate refresh token
    if (refreshToken) {
      await axiosInstance.post("/user/logout", { refreshToken });
    }
  } catch (error) {
    console.warn("Logout failed or no backend logout implemented:", error);
  } finally {
    // Always clear tokens locally
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};