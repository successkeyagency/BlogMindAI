import { motion } from 'framer-motion';

const waveText = "Explore Our Latest Blogs";

const BlogTitle = () => {
  return (
    <div className="text-center mb-14">
      <h1
        className="text-4xl sm:text-5xl font-extrabold 
        flex justify-center flex-wrap gap-1
        bg-gradient-to-r from-[#38bdf8] via-white to-[#6366f1]
        bg-clip-text text-transparent
        tracking-tight drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]"
      >
        {waveText.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: 0 }}
            animate={{ y: [0, -6, 0] }}
            transition={{
              delay: index * 0.045,
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h1>

      <p className="mt-2 text-blue-500 text-lg font-medium tracking-wide">
        Created by <span className='text-green-600'>SuccessKeyAgency LLC</span>
      </p>
    </div>
  );
};

export default BlogTitle;
