import React from "react";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { assets } from "../assets/assets.js";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-0">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 md:max-w-md text-center md:text-left">
          
          <img
            src={assets.successkeylogo}
            alt="SuccessKeyAgency Logo"
            className="w-20 h-20 object-contain filter drop-shadow-lg"
          />
          <div><h1>Created By</h1>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-green-400 tracking-wide">
              SuccessKeyAgency LLC
            </h2>
            <p className="text-gray-400 text-sm sm:text-base italic tracking-wide mt-1 max-w-xs">
              Innovate. Maintain. Scale. Building tomorrow’s digital experiences.
            </p>
          </div>
        </div>

        <nav className="flex justify-center md:justify-start space-x-8 text-green-400 text-3xl">
          {[{
            href: "https://instagram.com",
            icon: <FaInstagram />,
            label: "Instagram",
          }, {
            href: "https://twitter.com",
            icon: <FaTwitter />,
            label: "Twitter",
          }, {
            href: "https://facebook.com",
            icon: <FaFacebookF />,
            label: "Facebook",
          }].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-green-600 transition-transform transform hover:scale-110"
            >
              {icon}
            </a>
          ))}
        </nav>

        <div className="text-center md:text-right max-w-xs text-gray-400 text-sm space-y-2 select-none">
          <p>
            Made with <span className="text-red-500">❤️</span> by{" "}
            <span className="font-semibold text-green-400">SuccessKeyAgency LLC</span>
          </p>
          <p>
            &copy; 2025 SuccessKeyAgency LLC. All Rights Reserved | Created By{" "}
            <span className="text-orange-400 font-semibold">William Ngumo.</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 border-t border-gray-700" />
    </footer>
  );
};

export default Footer;
