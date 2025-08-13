import User from "../model/userModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in getCurrentUser controller :- ${error}`,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log("🔍 updateProfile called with:");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    console.log("req.userId:", req.userId);
    
    const userId = req.userId;

    const { name, description } = req.body; // Changed from 'about' to 'description' to match frontend

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Upload to Cloudinary if file is present
    if (req.file) {
      console.log("📁 File detected, uploading to Cloudinary...");
      try {
        const result = await uploadOnCloudinary(req.file.path);
        if (result) {
          user.photoUrl = result;
          console.log("✅ Cloudinary upload successful:", result);
        }
      } catch (cloudinaryError) {
        console.error("❌ Cloudinary upload error:", cloudinaryError);
        return res.status(500).json({
          success: false,
          message: "Failed to upload image",
        });
      }
    } else {
      console.log("📁 No file detected in request");
    }

    if (name) user.name = name;
    if (description) user.description = description; // Changed from 'about' to 'description'

    const updatedUser = await user.save();
    console.log("✅ User updated successfully");

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        description: updatedUser.description, // Changed from 'about' to 'description'
        photoUrl: updatedUser.photoUrl,
      },
    });
  } catch (error) {
    console.error("❌ Error in updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};