import { useState } from "react";
import axios from "axios";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog.jsx";
import { useDispatch, useSelector } from "react-redux";
import { USER_END_POINT } from "../../utils/content.js";
import { setLoading, setUser } from "@/redux/authslice.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [input, setInput] = useState({
    fullname: user.fullname || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    bio: user.profile?.bio || "",
    skills: user.profile?.skills?.join(", ") || "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setInput((prev) => ({ ...prev, file: e.target.files[0] }));
  };

const submitHandler = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("fullname", input.fullname);
  formData.append("email", input.email);
  formData.append("phoneNumber", input.phoneNumber);
  formData.append("bio", input.bio);
  formData.append("skills", input.skills);

  if (input.file instanceof File) {
    formData.append("resume", input.file);
  }

  try {
    dispatch(setLoading(true));

    const res = await axios.post(
      `${USER_END_POINT}/profile/update`,
      formData,
      { withCredentials: true }
    );

    if (res.data.success) {
      dispatch(setUser(res.data.user));
      toast.success(res.data.message);
      setOpen(false);

    }
    navigate("/profile")
    
  } catch (err) {
    toast.error(err.response?.data?.message || "Update failed");
  } finally {
    dispatch(setLoading(false));
  }
};


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={submitHandler}>
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={handleChange}
              className="col-span-3 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-sm font-medium text-gray-600">E-mail</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              className="col-span-3 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-sm font-medium text-gray-600">Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handleChange}
              className="col-span-3 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bio */}
          <div className="grid grid-cols-4 items-start gap-4">
            <label className="text-sm font-medium text-gray-600">Bio</label>
            <textarea
              name="bio"
              rows="3"
              value={input.bio}
              onChange={handleChange}
              className="col-span-3 border rounded-md px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Skills */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-sm font-medium text-gray-600">Skills</label>
            <input
              type="text"
              name="skills"
              value={input.skills}
              onChange={handleChange}
              placeholder="React, Node, MongoDB"
              className="col-span-3 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Resume */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-sm font-medium text-gray-600">Resume</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="col-span-3 text-sm"
            />
          </div>

          {/* Footer */}
          <DialogFooter className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"

            >
              Save Changes
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
