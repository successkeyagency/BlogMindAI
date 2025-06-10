import React from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-[#0b1117f2] backdrop-blur-md border-b border-[#1e293bcc] px-6 py-2 flex items-center justify-between shadow-md">
      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={() => navigate('/')}
      >
        <img
          src={assets.logo}
          alt="BlogMindAI Logo"
          className="w-8 sm:w-10"
        />
        <h1 className="text-base sm:text-lg font-semibold tracking-wide text-[#9ae6b4]">
          BlogMindAI <span className="text-[#60a5fa]">🧠</span>
        </h1>
      </div>

      <button
        onClick={() => navigate('/admin')}
        className="bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#2563eb] transition duration-300 text-white px-5 py-1.5 rounded-md text-sm flex items-center gap-1 select-none shadow"
      >
        {token ? 'Dashboard 🛠️' : 'Login 🔐'}
      </button>
    </nav>
  );
};

export default Navbar;
