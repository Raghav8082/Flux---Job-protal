import { user } from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

dotenv.config();

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password, role , profilePhoto} = req.body;
    const file = req.file;
    const normalizedRole = String(role ?? "").trim().toLowerCase();

    // ✅ validation
    if (!fullname || !email || !phonenumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    if (!["student", "recruiter"].includes(normalizedRole)) {
      return res.status(400).json({
        message: "Invalid role",
        success: false,
      });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let profilePhotoUrl = "";

    // ✅ upload image if present
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(
        fileUri.content,
        { resource_type: "image" }
      );

      console.log("PROFILE PHOTO UPLOADED:", cloudResponse.secure_url);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    const newUser = new user({
      fullname,
      email,
      phoneNumber: phonenumber,
      password: hashedPassword,
      role: normalizedRole,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const requestedRole = String(role ?? "").trim().toLowerCase();

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "Incorrect email",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    const userRole = String(existingUser.role ?? "").trim().toLowerCase();
    if (requestedRole && requestedRole !== userRole) {
      return res.status(400).json({
        message: "Incorrect role",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    const profile = existingUser.profile
      ? {
          ...(existingUser.profile.toObject
            ? existingUser.profile.toObject()
            : existingUser.profile),
        }
      : {};

    if (!profile.profilePhoto && profile.profilephoto) {
      profile.profilePhoto = profile.profilephoto;
    }

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .json({
        message: `Welcome back ${existingUser.fullname}!`,
        user: {
          _id: existingUser._id,
          id: existingUser._id,
          fullname: existingUser.fullname,
          email: existingUser.email,
          role: userRole,
          phoneNumber: existingUser.phoneNumber,
          profile,
        },
        success: true,
      });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

/* ================= LOGOUT ================= */
export const logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { maxAge: 0, httpOnly: true })
    .json({
      message: "Logged out successfully",
      success: true,
    });
};

/* ================= UPDATE PROFILE ================= */
export const updateprofile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    const userId = req.id;

    if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    let resumeData = {};

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(
        fileUri.content,
        { resource_type: "raw" }
      );

      console.log("RESUME UPLOADED:", cloudResponse.secure_url);

      resumeData = {
        "profile.resume": cloudResponse.secure_url,
        "profile.resumeOriginalName": file.originalname,
      };
    }

    const updatedUser = await user.findByIdAndUpdate(
      userId,
      {
        fullname,
        email,
        phoneNumber,
        "profile.bio": bio,
        "profile.skills": skills.split(","),
        ...resumeData,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
