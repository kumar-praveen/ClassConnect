import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exits",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res
      .status(201)
      .json({ success: true, message: "Account created successfully" });
  } catch (error) {
    console.log("Error at user register handler", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to register" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All credentials are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Password is incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Welcome back ${user.name}`,
        user,
      });
  } catch (error) {
    console.log("Error at user login", error);
    return res.status(500).json({ success: false, message: "Failed to login" });
  }
};

export const logout = async (__, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.log("Error at user logout", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to logout" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name, description } = req.body;
    const file = req.file;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (name) user.name = name;
    if (description) user.description = description;

    if (file) {
      const fileUri = getDataUri(file);
      let cloudResponse = await cloudinary.uploader.upload(fileUri , {folder: "LMS"});
      user.photoUrl = cloudResponse.secure_url;
    }

    await user.save();
    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error at updateProfile handler", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
