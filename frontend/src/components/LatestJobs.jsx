import React from "react";
import ListedJobCards from "./ListedJobCards.jsx"
import { useSelector } from "react-redux";

const JobListing = () => {
  const {alljobs} = useSelector(store=>store.job);
  return (
    <section className="relative w-full py-24 px-4 overflow-hidden">
      {/* Glow effect for background continuity */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
           <span className="text-zinc-500"> Featured </span><span className="text-blue-500">Job Openings</span>
          </h2>
          <p className="text-slate-400 mt-2 text-lg">Hand-picked opportunities from top-tier companies.</p>
        </div>

        {/* Job Grid: 3 columns on large screens, 2 on medium, 1 on small */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {alljobs?.slice(0,6).map((job) => (
           <ListedJobCards key={job._id} job={job} />
         ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-16 text-center">
          <button className="px-10 py-4 rounded-2xl border-2 border-white/10 text-white font-bold hover:bg-white hover:text-slate-950 transition-all duration-300">
            View All 150+ Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobListing;
