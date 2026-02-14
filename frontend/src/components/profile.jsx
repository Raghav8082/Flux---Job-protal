import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./shared/navbar";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

import { Contact, Mail, Pen } from "lucide-react";

import AppliedJobsTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";

const Profile = () => {
  // ✅ single source of truth
  const user = useSelector((store) => store.auth?.user);

  const [open, setOpen] = useState(false);

   console.log("PROFILE USER FROM REDUX:", user);


  const skills = user?.profile?.skills || [];
  const resumeUrl = user?.profile?.resume;

  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto mt-10 text-center text-gray-500">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-6 p-8 shadow-sm">

        {/* HEADER */}
        <div className="flex items-start justify-between">

          {/* LEFT */}
          <div className="flex items-start gap-5">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto ||
                  "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                }
                alt="User avatar"
                className="object-cover"
              />
              <AvatarFallback>
                {user?.fullname?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            <div>
              <h1 className="font-semibold text-lg text-gray-900">
                {user.fullname}
              </h1>

              <p className="text-gray-500 text-sm max-w-md">
                {user.profile?.bio || "No bio added yet."}
              </p>
            </div>
          </div>

          {/* EDIT */}
          <button
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
            onClick={() => setOpen(true)}
          >
            <Pen className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* CONTACT */}
        <div className="mt-6 space-y-3 text-sm text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4" />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Contact className="w-4 h-4" />
            <span>{user.phoneNumber || "NA"}</span>
          </div>
        </div>

        {/* SKILLS */}
        <div className="mt-6">
          <h3 className="font-semibold text-sm mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="rounded-full px-3 py-1 text-xs bg-gray-900 text-white"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* RESUME */}
        <div className="mt-6">
          <label className="block text-sm font-semibold mb-1">Resume</label>
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 text-sm hover:underline"
            >
              View Resume
            </a>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>

        {/* JOBS */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl mt-8">
          <h1 className="font-bold text-lg mb-4">Applied Jobs</h1>
          <AppliedJobsTable />
        </div>

        {/* MODAL */}
        <UpdateProfileDialog open={open} setOpen={setOpen} />
       
      </div>
    </div>
  );
};

export default Profile;


