import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import Navbar from "../shared/navbar";
import axios from "axios";
import { USER_END_POINT } from "../../../utils/content.js";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading,setUser } from "@/redux/authslice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError("");
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const loginhandler = async (e)=>{
    e.preventDefault();
    if (!input.role) {
      toast.error("Please select a role");
      return;
    }
    try{
      dispatch(setLoading(true));
      const response = await axios.post( `${USER_END_POINT}/login`, input ,{
          headers:{
            "Content-Type": "application/json",
          },
          withCredentials:true,
        });
      if(response.data.success){
        dispatch(setUser(response.data.user))
        toast.success(response.data.message);
        navigate('/');

      }else{
        toast.error(response.data.message);
        console.log("not possible")
      }

      

    }
    catch(error){
      toast.error(error.response?.data?.message || "An error occurred during login");
    }
    finally{
      dispatch(setLoading(false));
    }
  }
    // 🔴 fake validation
    // if (
    //   input.email !== "test@example.com" ||
    //   input.password !== "123456"
    // ) {
    //   setError("Invalid email or password");
    //   return;
    // }

 

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <form
          onSubmit={loginhandler}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-5"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-2">
              Login to continue 🚀
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
              <input
                type="email"
                required
                placeholder="john@example.com"
                name="email"
                value={input.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg outline-none
                  ${
                    error
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-2 focus:ring-blue-500"
                  }`}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                name="password"
                value={input.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg outline-none
                  ${
                    error
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-2 focus:ring-blue-500"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Role
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:border-blue-500 transition">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  className="accent-blue-600"
                  onChange={handleChange}
                />
                <span className="text-sm font-medium">Student</span>
              </label>

              <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:border-blue-500 transition">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="accent-blue-600"
                  onChange={handleChange}
                />
                <span className="text-sm font-medium">Recruiter</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg text-white font-semibold transition flex items-center justify-center gap-2 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin size-5" />
                <span>Please Wait</span>
              </>
            ) : (
              "Login"
            )}
          </button>
         

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
