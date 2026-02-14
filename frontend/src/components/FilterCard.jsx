import React from "react";

const filterdata = [
  {
    title: "Work Mode",
    options: ["Onsite", "Remote", "Hybrid"],
  },
  {
    title: "Job Type",
    options: ["Full-time", "Part-time", "Internship", "Contract"],
  },
  {
    title: "Experience Level",
    options: ["Fresher", "1-3 Years", "3-5 Years", "5+ Years"],
  },
  {
    title: "Company Type",
    options: ["Startup", "MNC", "Product Based", "Service Based"],
  },
];


const FilterCard = () => {
    return (
      <aside className="w-72 px-5 py-6">
  
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Filters
        </h2>
  
        <div className="space-y-6">
          {filterdata.map((section, index) => (
            <div key={index}>
              
              {/* Section Title */}
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                {section.title}
              </h3>
  
              {/* Options */}
              <div className="space-y-2">
                {section.options.map((option, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                  >
                    <input
                      type="checkbox"
                      className="accent-blue-600"
                    />
                    {option}
                  </label>
                ))}
              </div>
  
            </div>
          ))}
        </div>
  
      </aside>
    );
  };
  
  export default FilterCard;
  