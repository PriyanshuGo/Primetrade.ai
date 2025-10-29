import { successResponse, errorResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";


const registerUser = async (req, res) => {
    //get user detials from request body
    //validation on data
    //check already exist vai email or phone no.
    //create user obj and entry in db 
    //return response


    try {
        const {
            fullName,
            email,
            password,
            phoneNumber,
        } = req.body;

        // 1. Basic validation
        if (!fullName || !email || !password || !phoneNumber) {
            return errorResponse(res, "Full name, email, password, and phone number are required", 400);
        }

        // 2. Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { phoneNumber }],
        });
        if (existingUser) {
            return errorResponse(res, "User with this email or phone number already exists", 409);
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
        });

        await newUser.save();

        const createdUser = await User.findById(newUser._id).select(
            "-password -refreshToken"
        )
        // 6. Return success response
        return successResponse(res, { user: createdUser }, "User registered successfully", 201);

    } catch (err) {
        console.error(err);
        return errorResponse(res, "Failed to register user", 500, err.message);
    }
};


const loginUser = async (req, res) => {
    //get user detials from request body
    //validation on data
    //check user exist vai email or phone no.
    //add access token and refresh token
    //return response

    try {
        const { identifier, password } = req.body;
        if (!identifier) {
            return errorResponse(res, "Email or phone number is required", 400);
        }


        if (!password) {
            return errorResponse(res, "Password is required", 400);
        }

        const user = await User.findOne({
            $or: [{ email: identifier }, { phoneNumber: identifier }],
        });

        if (!user) {
            return errorResponse(res, "User not found", 404);
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return errorResponse(res, "Invalid password", 401);
        }

        const { accessToken, refreshToken } = await generateAcessTokenAndRefreshToken(user._id);
        console.log(accessToken, refreshToken);
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
        console.log(loggedInUser)

        const responseData = {
            user: loggedInUser,
            accessToken,
            refreshToken,
        };
        return successResponse(res, responseData, "User logged in successfully", 200);


    } catch (error) {
        errorResponse(res, "Failed to login user", 500, error.message);
    }

}

const generateAcessTokenAndRefreshToken = async (userID) => {
    try {
        const user = await User.findById(userID);
        const accessToken = user.generateAcessToken(user);
        const refreshToken = user.generateRefreshToken(user);

        console.log(accessToken, refreshToken);
        user.refreshToken = refreshToken;

        await user.save();

        return { accessToken, refreshToken };
    } catch (error) {
        throw error;
    }
}

const logoutUser = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming auth middleware sets req.user
    const user = await User.findById(userId);

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    // Clear refresh token
    user.refreshToken = null;
    await user.save();

    return successResponse(res, {}, "Logged out successfully", 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to logout user", 500, error.message);
  }
};

export { registerUser, loginUser, logoutUser };