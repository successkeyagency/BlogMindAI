import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { to: '/admin', label: 'Dashboard', emoji: '🏠', end: true },
    { to: '/admin/addBlog', label: 'Add blogs', emoji: '➕' },
    { to: '/admin/listBlog', label: 'Blog lists', emoji: '📋' },
    { to: '/admin/comments', label: 'Comments', emoji: '💬' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex items-center justify-center gap-4 px-2 sm:px-8 overflow-x-auto scrollbar-hide">
        {links.map(({ to, label, emoji, end }, idx) => (
          <NavLink
            key={idx}
            to={to}
            end={end}
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-1 sm:gap-2 py-3 px-2 sm:px-4
               text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                 isActive
                   ? 'text-primary border-b-2 border-primary after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:border-x-transparent after:border-t-primary after:border-b-transparent'
                   : 'text-gray-600 hover:text-primary'
               }`
            }
          >
            <span className="text-base sm:text-lg">{emoji}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
