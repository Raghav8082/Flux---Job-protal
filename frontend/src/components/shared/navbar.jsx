import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "../ui/popover.jsx";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "../ui/avatar.jsx";
import { LogOut, User2 } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_END_POINT } from "../../../utils/content.js";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authslice.js";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = String(user?.role ?? "").trim().toLowerCase();
  const isRecruiter = role === "recruiter";
  const logouthandler = async () => {
    // Implement logout functionality here
    try {
      const res = await axios.get(`${USER_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const userInitials = user?.fullname
    ? user.fullname
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-tight">
          F<span className="text-blue-600">lux</span>
        </h1>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {user && isRecruiter ? (
            <>
              <li>
                <Link to="/admin/companies">Companies</Link>
              </li>
              <li>
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="hover:text-blue-600 transition-colors"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/browse"
                  className="hover:text-blue-600 transition-colors"
                >
                  Browse
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Right section */}
        {!user ? (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <button className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 transition">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md  transition">
                Signup
              </button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition">
                <AvatarImage
                  src={user.profile?.profilePhoto}
                  alt="User avatar"
                />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className="w-64">
              <div className="space-y-2">
                <div>
                  <h4 className="font-semibold">{user.fullname}</h4>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <div className="border-t pt-3 flex flex-col gap-2">
                  <Link to="/profile">
                    <button className="flex items-center gap-2 text-sm hover:text-blue-600 transition">
                      <User2 size={16} />
                      View Profile
                    </button>
                  </Link>

                  <button
                    type="button"
                    className="flex items-center gap-2 text-sm hover:text-red-500 transition"
                    onClick={logouthandler}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  );
};

export default Navbar;
