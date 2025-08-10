//create user model ->
//create a user schema include name, about, email, password, role(student,educator), photoUrl, enrolled courses

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    about: {
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
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["student", "educator"],
      required:true
    },
    photoUrl: {
      type: String,
      default:""
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

export default User;
