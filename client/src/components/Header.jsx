import React, { useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const random = (min, max) => Math.random() * (max - min) + min;


const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };

  useEffect(() => {
    const stars = document.querySelectorAll(".star");
    const interval = setInterval(() => {
      stars.forEach((star) => {
        star.style.opacity = (0.5 + Math.random() * 0.5).toFixed(2);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="relative min-h-screen flex flex-col justify-center items-center text-white px-6 sm:px-16 xl:px-32
       overflow-hidden bg-gradient-to-b from-[#050a15] via-[#0a0f1c] to-[#0d111e] pt-20"
      style={{ scrollMarginTop: "80px" }}
    >
      {[...Array(60)].map((_, i) => {
        const size = random(1, 3);
        const top = random(0, 100);
        const left = random(0, 100);
        const delay = random(0, 5);
        return (
          <div
            key={i}
            className="star absolute rounded-full bg-white"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              opacity: 0.7,
              animation: `twinkle 3s infinite ease-in-out`,
              animationDelay: `${delay}s`,
              filter: "drop-shadow(0 0 3px #7dd3fc)",
            }}
          />
        );
      })}

      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="shooting-star absolute rounded-full bg-gradient-to-r from-[#38bdf8] to-transparent"
          style={{
            width: "3px",
            height: "70px",
            top: `${10 + i * 20}%`,
            left: "-100px",
            filter: "drop-shadow(0 0 6px #38bdf8)",
            animation: `shoot 4s linear infinite`,
            animationDelay: `${i * 1.2}s`,
            transform: "rotate(45deg)",
          }}
        />
      ))}

      <div className="spaceship absolute top-40 left-[-150px] z-10 text-[40px] animate-fly drop-shadow-[0_0_6px_#38bdf8]">
        🚀
      </div>

      <div className="absolute rounded-full w-[600px] h-[600px] bg-blue-400 opacity-10 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-20 inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-cyan-400/30 shadow-[0_0_15px_#38bdf8aa] text-sm text-cyan-300 font-semibold rounded-[0.5rem_1rem_0.5rem_1rem] mb-6 backdrop-blur-sm">
  <span>🤖 Explore the Cosmos of Stories with AI</span>
  
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 animate-pulse fill-cyan-300"
    viewBox="0 0 24 24"
  >
    <path d="M12 2l2.39 6.93H22l-5.2 3.77L18.8 22 12 17.27 5.2 22l1.99-9.3L2 8.93h7.61z" />
  </svg>
</div>


      <h1 className="relative z-20 text-center text-5xl sm:text-7xl font-extrabold tracking-wide leading-tight mb-6 drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]">
        Night Reads
        <br />
        <span className="text-[#38bdf8]">Stories Beyond the Stars</span>
      </h1>

      <p className="relative z-20 max-w-3xl text-center text-gray-300 text-lg mb-10 px-4 sm:px-0 leading-relaxed">
        Drift through the night with tales that glow like distant galaxies.
        Write, read, and discover in the tranquil vastness of space.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="relative z-20 flex max-w-xl w-full rounded-full overflow-hidden border border-white/10 shadow-lg bg-[#0d111b]"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="🔭 Search the universe of stories..."
          className="flex-grow bg-transparent px-6 py-3 text-white placeholder:text-white/40 outline-none"
          required
        />
        <button
          type="submit"
          className="bg-[#38bdf8] px-8 py-3 font-semibold text-black hover:bg-[#0ea5e9] transition-colors duration-300"
        >
          Search
        </button>
      </form>

      {input && (
        <button
          onClick={onClear}
          className="relative z-20 mt-5 px-6 py-2 border border-white/20 rounded-full text-white hover:bg-white/10 transition-colors duration-300"
        >
          ❌ Clear Search
        </button>
      )}
      <div className="relative z-20 mt-12 w-[320px] h-[120px] bg-white/5 border border-white/10 rounded-xl p-4 overflow-hidden shadow-lg text-sm text-gray-100 font-mono">
        <div className="chat-move flex flex-col space-y-2">
          <div className="chat-bubble self-start bg-white/10 rounded-lg px-3 py-1 max-w-[80%]">
            "Ever wondered what stories the stars hold?"
          </div>
          <div className="chat-bubble self-end bg-white/15 rounded-lg px-3 py-1 max-w-[70%]">
            "Each night whispers secrets of the cosmos..."
          </div>
          <div className="chat-bubble self-start bg-white/10 rounded-lg px-3 py-1 max-w-[75%]">
            "Let your imagination soar beyond the horizon."
          </div>
          <div className="chat-bubble self-end bg-white/15 rounded-lg px-3 py-1 max-w-[65%]">
            "And find your story among the stars."
          </div>
        </div>
      </div>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.2; }
        }
        @keyframes shoot {
          0% { transform: translateX(0) translateY(0) rotate(45deg); opacity: 1; }
          100% { transform: translateX(700px) translateY(700px) rotate(45deg); opacity: 0; }
        }
        @keyframes fly {
          0% { transform: translateX(0) translateY(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(900px) translateY(150px) rotate(15deg); opacity: 0; }
        }
        @keyframes slide-left-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(15px); }
        }
        .animate-fly { animation: fly 12s linear infinite; }
        .chat-move > div { animation: slide-left-right 5s ease-in-out infinite; }
        .chat-move > div:nth-child(2n) { animation-delay: 0.25s; }
        .chat-move > div:nth-child(3n) { animation-delay: 0.5s; }
        .chat-move > div:nth-child(4n) { animation-delay: 0.75s; }
      `}</style>
    </header>
  );
};

export default Header;
