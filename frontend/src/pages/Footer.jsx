import React from "react";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <div className="bg-black text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between gap-10">
        {/* Left Section */}
        <div className="lg:w-[40%] md:w-[50%] w-full">
          <img src={logo} alt="" className="h-10 mb-3 rounded-md" />
          <h2 className="text-xl font-bold text-white mb-3">Edura</h2>
          <p className="text-sm leading-relaxed">
            AI-powered learning platform to help you grow smarter. Learn
            anything, anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div className="lg:w-[25%] md:w-[40%] w-full">
          <div className="text-white font-semibold mb-3">Quick Links</div>
          <ul className="text-sm space-y-2">
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/home")}
            >
              Home
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/allcourses")}
            >
              All Courses
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              Login
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="lg:w-[25%] md:w-[40%] w-full">
          <div className="text-white font-semibold mb-3">Categories</div>
          <ul className="text-sm space-y-2">
            <li className="hover:text-white">Web Development</li>
            <li className="hover:text-white">App Development</li>
            <li className="hover:text-white">AI/ML</li>
            <li className="hover:text-white">UI/UX Designing</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-5 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} LearnAI. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
