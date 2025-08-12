import User from "../model/userModel.js";

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
    const userId = req.userId;

    const { name, about, photoUrl } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Upload to Cloudinary if file is present
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_profiles",
        resource_type: "image",
      });
      user.photoUrl = result.secure_url;
    }

    if (name) user.name = name;
    if (about) user.about = about;
    if (photoUrl) user.photoUrl = photoUrl;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        about: updatedUser.about,
        photoUrl: updatedUser.photoUrl,
      },
    });
  } catch (error) {
    console.error("Error in updating profile :- ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
