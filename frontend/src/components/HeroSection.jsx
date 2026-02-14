import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-5xl w-full text-center">

        {/* Trust Badge */}
        <div className="inline-flex items-center justify-center px-4 py-1 mb-6 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">
          No. 1 Job Hunt Platform
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
          Search, Apply & <br />
          Get Your{" "}
          <span className="text-indigo-600">Dream Jobs</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
          Discover opportunities from top companies and trusted recruiters.
          Build your career with confidence and clarity.
        </p>

        {/* Search Bar */}
        <div className="mt-10 max-w-3xl mx-auto flex items-center bg-white border border-slate-200 rounded-full shadow-sm overflow-hidden">
          <input
            type="text"
            placeholder="Search jobs by role, skill, or company"
            className="flex-1 px-6 py-4 text-slate-700 outline-none"
          />
          <button className="px-8 py-4 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            Search
          </button>
        </div>

        {/* Quick Categories */}
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap text-sm text-slate-600">
          <span className="px-4 py-2 border border-slate-200 rounded-full">
            Frontend Developer
          </span>
          <span className="px-4 py-2 border border-slate-200 rounded-full">
            Backend Developer
          </span>
          <span className="px-4 py-2 border border-slate-200 rounded-full">
            Data Scientist
          </span>
          <span className="px-4 py-2 border border-slate-200 rounded-full">
            DevOps Engineer
          </span>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
