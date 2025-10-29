// src/services/userService.ts
import axiosInstance from "@/services/axoisInstance";
import type { UserProfile } from "@/types/user";

// GET Profile
export const getProfile = async (): Promise<UserProfile> => {
  const res = await axiosInstance.get("/profile/");
  return res.data.data.user;
};

// UPDATE Profile
export const updateProfile = async (payload: Partial<UserProfile>): Promise<UserProfile> => {
  const res = await axiosInstance.put("/profile/", payload);
  return res.data.data.user;
};
