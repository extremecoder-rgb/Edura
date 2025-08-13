import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: [true, "Email should be unique"],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      required: function () {
        // Only require password if not signing up with Google
        return !this.googleAuth;
      },
    },
    role: {
      type: String,
      enum: ["student", "educator"],
      required: true,
    },
    photoUrl: {
      type: String,
      default: "",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    resetOtp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
    googleAuth: {
      type: Boolean,
      default: false, 
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
