import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="group cursor-pointer rounded-xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md hover:shadow-[0_0_15px_#38bdf8] transition-all duration-300 w-full max-w-full"
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-[#38bdf8]/20 text-[#38bdf8] text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-[#38bdf8]/30">
          {category}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-white font-semibold text-base sm:text-lg leading-tight mb-2 drop-shadow">
          {title}
        </h3>
        <p
          className="text-gray-300 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: description.slice(0, 100).trim() + '...',
          }}
        />
      </div>
    </div>
  );
};

export default BlogCard;
