import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { blogCategories } from '../assets/assets';
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext';

const BlogList = () => {
  const { blogs } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <section className="min-h-screen w-full px-6 sm:px-10 xl:px-28 py-12">
      {/* Filter Dropdown */}
      <div className="w-full flex justify-center mb-10">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#1a1a2e] text-white px-6 py-3 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
        >
          <option value="All">All</option>
          {blogCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Blog Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10"
      >
        {filteredBlogs.map((blog) => (
          <motion.div layout key={blog._id}>
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BlogList;
