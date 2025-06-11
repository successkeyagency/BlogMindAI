import React, { useState } from "react";
import { motion } from "framer-motion";
import { blogCategories } from "../assets/assets";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";
import BlogTitle from "./BlogTitle";

const BlogList = () => {
  const { blogs } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <section className="min-h-screen w-full px-6 sm:px-10 xl:px-15 py-12 ">
      <BlogTitle />

      <div className="flex flex-col sm:flex-row gap-10">
        {/* Sidebar for desktop */}
        <aside className="hidden sm:flex flex-col min-w-[200px] space-y-6">
          <h3 className="text-[#38bdf8] text-xl font-extrabold mb-10 uppercase tracking-wide border-l-4 border-[#38bdf8] pl-3 shadow-lg drop-shadow-md">
            Categories
          </h3>

          {blogCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                initial={false}
                animate={{
                  backgroundColor: isActive ? "#38bdf8" : "#1a1a2e",
                  color: isActive ? "black" : "white",
                  scale: isActive ? 1.05 : 1,
                  boxShadow: isActive
                    ? "0 4px 12px rgba(56, 189, 248, 0.6)"
                    : "none",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-left px-4 py-2 rounded-lg font-semibold cursor-pointer"
              >
                {cat}
              </motion.button>
            );
          })}
        </aside>

        {/* Mobile dropdown */}
        <div className="sm:hidden w-full mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#1a1a2e] text-white px-6 py-3 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] w-full"
          >
            {blogCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Blog Cards grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 flex-grow"
        >
          {filteredBlogs.map((blog) => (
            <motion.div layout key={blog._id}>
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogList;
