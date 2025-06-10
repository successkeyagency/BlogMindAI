import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import BlogList from '../components/BlogList';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import Spotlight from '../components/SpotLight';
import ImageSlider from '../components/ImageSlider';
import DownloadApp from '../components/DownloadApp';
import AiVideoSection from '../components/AiVideoSection';
import { assets } from '../assets/assets'; 

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-black z-50">
        <img
          src={assets.successkeylogo}
          alt="SuccessKeyAgency Logo"
          className="w-32 h-32 mb-4"
        />
        <p className="text-green-500 text-lg font-semibold">
          <span className='text-white'>Created by </span>  SuccessKeyAgency LLC
        </p>
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mt-6"></div>
      </div>
    );
  }

  return (
    <>
      <Spotlight />
      <Navbar />
      <Header />
      <ImageSlider />
      <BlogList />
      <DownloadApp />
      <AiVideoSection />
      <Footer />
    </>
  );
};

export default Home;
