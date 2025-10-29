import { User } from "../models/user.model.js";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";

// 🧍‍♂️ Get logged-in user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    if (!user) return errorResponse(res, "User not found", 404);
    return successResponse(res, { user }, "Profile fetched successfully", 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to get profile", 500, error.message);
  }
};

// ✏️ Update profile
export const updateProfile = async (req, res) => {
  try {
    const { fullName, bio, avatar, address, phoneNumber } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { fullName, bio, avatar, address, phoneNumber },
      { new: true }
    ).select("-password -refreshToken");

    return successResponse(res, { user: updatedUser }, "Profile updated successfully", 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to update profile", 500, error.message);
  }
};
