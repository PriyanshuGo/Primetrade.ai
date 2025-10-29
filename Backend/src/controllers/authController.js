export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return errorResponse(res, "No refresh token provided", 401);

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded._id);

    if (!user || user.refreshToken !== refreshToken) {
      return errorResponse(res, "Invalid refresh token", 403);
    }

    const newAccessToken = user.generateAcessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save();

    return successResponse(
      res,
      { accessToken: newAccessToken, refreshToken: newRefreshToken },
      "Tokens refreshed successfully"
    );
  } catch (error) {
    return errorResponse(res, "Invalid or expired refresh token", 403, error.message);
  }
};
