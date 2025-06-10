import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { blogCategories } from '../assets/assets';
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext';

import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import ImageSlider from './ImageSlider';
import BlogTitle from './BlogTitle';

const BlogList = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { blogs, input } = useAppContext();

  const filteredBlogs = blogs.filter((blog) => {
    const matchesInput =
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.category.toLowerCase().includes(input.toLowerCase());

    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;

    return matchesInput && matchesCategory;
  });

  return (
    <section
      className="
        px-6 sm:px-10 xl:px-32 py-12 sm:py-16
        bg-gradient-to-b from-[#0a0f1c] via-[#0d111e] to-[#050a15]
        text-white
        min-h-[50vh] lg:min-h-
      "
    >
      <BlogTitle />
            <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:hidden mb-8 w-full max-w-xs mx-auto">
          <Listbox value={activeCategory} onChange={setActiveCategory}>
            <div className="relative">
              <Listbox.Button
                className="relative w-full py-4 pl-6 pr-10 text-lg font-semibold text-left bg-[#1e293b] rounded-2xl shadow-lg
                cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#38bdf8]/70
                transition duration-200 ease-in-out hover:bg-[#273549]"
              >
                {activeCategory}
                <ChevronUpDownIcon
                  className="absolute inset-y-0 right-4 h-6 w-6 text-[#38bdf8]"
                  aria-hidden="true"
                />
              </Listbox.Button>

              <Listbox.Options
                className="absolute z-30 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-[#111827] shadow-2xl ring-1 ring-black/20
                focus:outline-none scrollbar-thin scrollbar-thumb-[#38bdf8]/50 scrollbar-track-transparent"
              >
                {blogCategories.map((category, i) => (
                  <Listbox.Option
                    key={i}
                    value={category}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-3 px-6 text-lg font-medium rounded-lg
                      ${active ? 'bg-[#38bdf8] text-black' : 'text-white'}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`${selected ? 'font-bold' : 'font-normal'} block`}>
                          {category}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 right-6 flex items-center text-black">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        <aside className="hidden lg:block lg:w-64">
          <h2 className="text-white font-semibold mb-6 text-xl tracking-wide">📂 Categories</h2>
          <div className="flex flex-col gap-4">
            {blogCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileTap={{ scale: 0.97 }}
                  className={`relative px-7 py-3 rounded-3xl text-base font-semibold transition-all duration-300 w-full text-left
                    ${
                      isActive
                        ? 'text-black bg-[#38bdf8] shadow-[0_0_15px_#38bdf8]'
                        : 'text-white/70 hover:text-white hover:bg-white/20'
                    }
                    hover:shadow-[0_0_10px_#38bdf8]/70
                  `}
                >
                  {category}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-3xl bg-[#38bdf8] -z-10"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </aside>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 flex-grow"
        >
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : (
            <motion.div
              className="col-span-full text-center text-white/70 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No blogs found for your search. Try something else 🌌
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogList;
