import React from "react";

const ListedJobs = ({ job }) => {
  if (!job) return null;

  const title = job.title ?? "Untitled role";
  const companyName = job.company?.name ?? "Unknown company";
  const jobType = job.jobtype ?? job.type ?? "JOBTYPE";
  const location = job.location ?? "—";
  const salary = job.salary ?? "—";

  return (
    <div
      className="
        group relative bg-white/95 backdrop-blur-xl rounded-[2rem] p-8
        border border-white/20 shadow-xl transition-all duration-300
        hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
        cursor-pointer
      "
    >
      {/* Card Header: Logo & Tag */}
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/20">
          lo
        </div>
        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
          {jobType}
        </span>
      </div>

      {/* Job Info */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 font-medium mt-1">{companyName}</p>

        <div className="mt-6 space-y-3">
          <div className="flex items-center text-slate-600 text-sm">
            <span className="mr-2">📍</span> {location}
          </div>
          <div className="flex items-center text-slate-600 text-sm">
            <span className="mr-2">💰</span> {salary}
          </div>
        </div>
      </div>

      {/* CTA Button Inside Card */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
        <button className="text-blue-600 font-bold text-sm group-hover:underline">
          View Details
        </button>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
          →
        </div>
      </div>
    </div>
  );
};

export default ListedJobs;

