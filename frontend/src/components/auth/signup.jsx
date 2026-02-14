import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Loader2,
} from "lucide-react";
import Navbar from "../shared/navbar";
import axios from "axios";
import { USER_END_POINT } from "../../../utils/content.js";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authslice";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
    role: "",
  profilePhoto: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  /* ---------------- Password Strength ---------------- */
  const passwordStrength =
    input.password.length < 6
      ? "Weak"
      : input.password.length < 10
      ? "Medium"
      : "Strong";

  const strengthColor =
    passwordStrength === "Weak"
      ? "text-red-500"
      : passwordStrength === "Medium"
      ? "text-yellow-500"
      : "text-green-600";

  /* ---------------- Handlers ---------------- */
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, profilePhoto: e.target.files[0] });
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error("Please select a role");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phonenumber", input.phonenumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    try {
      dispatch(setLoading(true));

      const response = await axios.post(
        `${USER_END_POINT}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed. Try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <form
          onSubmit={signupHandler}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-5"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Create Account
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Join us and build something awesome 🚀
            </p>
          </div>

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
              <input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
              <input
                type="tel"
                name="phonenumber"
                value={input.phonenumber}
                onChange={handleChange}
                required
                placeholder="1234567890"
                className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={input.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className={`text-xs mt-1 ${strengthColor}`}>
              Password strength: {passwordStrength}
            </p>
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Role
            </label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {["student", "recruiter"].map((role) => (
                <label
                  key={role}
                  className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:border-blue-500"
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={input.role === role}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  <span className="capitalize text-sm font-medium">
                    {role}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Profile */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <div className="flex items-center gap-4 mt-1">
              <label className="cursor-pointer px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={changeFileHandler}
                />
              </label>
              <span className="text-xs text-gray-500">
                JPG / PNG (≤ 2MB)
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg text-white font-semibold flex justify-center items-center gap-2 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin size-5" />
                Please wait
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
