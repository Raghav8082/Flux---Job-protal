import React from "react";
import { MapPin, Briefcase, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Job = ({ job }) => {
  const navigate = useNavigate();

  if (!job) return null;

  const title = job.title ?? "Untitled role";
  const companyName = job.company?.name ?? "Unknown company";
  const companyLogo = job.company?.logo ?? "";
  const location = job.location ?? "—";
  const jobType = job.jobtype ?? job.type ?? "—";
  const salary = job.salary ?? "—";

  const initials =
    companyName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "CO";

  return (
    <div className="bg-white border rounded-md p-4 hover:shadow-lg transition-shadow flex gap-4">
      {/* Company Logo */}
      <div className="w-16 h-16 flex-shrink-0 border rounded-md flex items-center justify-center bg-gray-50">
        <Avatar className="w-14 h-14 rounded-md" size="lg">
          {companyLogo ? (
            <AvatarImage
              src={companyLogo}
              alt={`${companyName} logo`}
              className="rounded-md object-contain bg-white"
            />
          ) : null}
          <AvatarFallback className="rounded-md text-base font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Job Info */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-blue-700 hover:underline cursor-pointer">
          {title}
        </h2>

        <p className="text-sm text-gray-700 font-medium">{companyName}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {location}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase size={14} /> {jobType}
          </span>
          <span>"2+ years "</span>
        </div>

        <p className="mt-2 text-sm text-gray-800 font-semibold">💰 {salary}</p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-3">
            <button className="px-4 py-1 text-sm border rounded-md hover:bg-gray-100">
              Apply
            </button>

            <button
              className="px-4 py-1 text-sm border rounded-md hover:bg-gray-100"
              onClick={() => job._id && navigate(`/description/${job._id}`)}
            >
              Details
            </button>

            <button className="p-2 border rounded-md hover:bg-gray-100">
              <Bookmark size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
