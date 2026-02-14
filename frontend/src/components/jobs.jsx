import React from "react";
import Navbar from "./shared/navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "./hooks/useGetAllJobs.jsx";

const Jobs = () => {
  useGetAllJobs();
  const { alljobs } = useSelector((store) => store.job);

  return (
    <>
      <Navbar />

      {/* FULL WIDTH PAGE */}
      <div className="flex w-full">

        {/* LEFT FILTER SIDEBAR */}
        <div className="w-72 border-r bg-white min-h-screen">
          <FilterCard />
        </div>

        {/* JOB LIST SECTION */}
        <div className="flex-1 px-6 py-5">
          {!alljobs || alljobs.length === 0 ? (
            <span className="text-gray-500">Job not found</span>
          ) : (
            <div className="grid grid-cols-1">
              {alljobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default Jobs;
