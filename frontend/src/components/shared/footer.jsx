import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-slate-700 pb-12">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Flux<span className="text-blue-500">Jobs</span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              A trusted career platform connecting students, professionals,
              and recruiters with opportunities that matter.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Platform
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white transition cursor-pointer">Jobs</li>
              <li className="hover:text-white transition cursor-pointer">Internships</li>
              <li className="hover:text-white transition cursor-pointer">Companies</li>
              <li className="hover:text-white transition cursor-pointer">Categories</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white transition cursor-pointer">About Us</li>
              <li className="hover:text-white transition cursor-pointer">Careers</li>
              <li className="hover:text-white transition cursor-pointer">Blog</li>
              <li className="hover:text-white transition cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white transition cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white transition cursor-pointer">Terms of Service</li>
              <li className="hover:text-white transition cursor-pointer">Cookie Policy</li>
              <li className="hover:text-white transition cursor-pointer">Compliance</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} FluxJobs. All rights reserved.
          </p>

          <div className="flex gap-6">
            <span className="hover:text-white transition cursor-pointer">
              LinkedIn
            </span>
            <span className="hover:text-white transition cursor-pointer">
              Twitter
            </span>
            <span className="hover:text-white transition cursor-pointer">
              GitHub
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
