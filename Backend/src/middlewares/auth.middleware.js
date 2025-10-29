import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/ApiResponse.js";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, "Access denied. No token provided.", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // ✅ Attach user payload to request
    req.user = decoded;

    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return errorResponse(res, "Invalid or expired token", 401);
  }
};
