import React, { useRef } from "react";

const categories = [
  { title: "Software Development", icon: "💻" },
  { title: "Data Science", icon: "📊" },
  { title: "AI & ML", icon: "🤖" },
  { title: "DevOps", icon: "⚙️" },
  { title: "Cyber Security", icon: "🛡️" },
  { title: "UI / UX Design", icon: "🎨" },
  { title: "Product Management", icon: "📦" },
  { title: "Cloud Computing", icon: "☁️" },
];

const CategoryCarousel = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10 select-none">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Explore Job Categories
          </h2>

          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white bg-blue-600 text-white hover:bg-white hover:text-blue-600 transition text-2xl"
            >
              ‹
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white bg-blue-600 text-white hover:bg-white hover:text-blue-600 transition text-2xl"
            >
              ›
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="
            flex gap-6 overflow-x-auto scroll-smooth
            /* Hide scrollbar for all browsers */
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            pb-4
          "
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="
                min-w-[260px]
                bg-white/95
                backdrop-blur
                rounded-2xl
                p-6
                border border-blue-500/30
                hover:border-blue-500
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_15px_40px_rgba(59,130,246,0.25)]
                cursor-pointer
              "
            >
              <div className="text-3xl mb-4">{cat.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900">
                {cat.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Explore opportunities and roles in this domain
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;