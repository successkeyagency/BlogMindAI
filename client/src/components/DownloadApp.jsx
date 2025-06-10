import React from 'react';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import { assets } from '../assets/assets.js';

const DownloadApp = () => {
  return (
    <section className="px-6 sm:px-10 xl:px-32 py-16 bg-white text-gray-900">
      <div className="flex flex-col items-center text-center gap-12 lg:flex-row lg:justify-center lg:items-center lg:gap-20">

        <div className="flex justify-center">
          <img
            src={assets.phone}
            alt="App Screenshot"
            className="w-40 sm:w-48 lg:w-72 rounded-2xl shadow-xl border border-gray-200"
          />
        </div>

        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Get Our App
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Experience our platform on the go. Download our mobile app from your favorite store today and stay connected.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="#"
              className="flex items-center gap-3 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl transition duration-200 shadow"
            >
              <FaGooglePlay className="text-2xl text-[#1A73E8]" />
              <div className="text-left">
                <p className="text-xs text-gray-500">GET IT ON</p>
                <p className="text-sm font-semibold">Google Play</p>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl transition duration-200 shadow"
            >
              <FaApple className="text-2xl text-black" />
              <div className="text-left">
                <p className="text-xs text-gray-500">Download on the</p>
                <p className="text-sm font-semibold">App Store</p>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DownloadApp;
