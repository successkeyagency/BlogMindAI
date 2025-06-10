import React from "react";

const AiVideoSection = () => {
  return (
    <section className="relative px-6 sm:px-10 xl:px-32 py-20 bg-gray-50 text-center text-gray-900 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
          We’re using AI to power our blog — powered by Google Gemini
        </h2>
        <p className="text-gray-700 mb-12 max-w-xl mx-auto">
          Leveraging the latest advances in artificial intelligence with Google
          Gemini, we bring you optimized content and intelligent insights that
          elevate your reading experience.
        </p>

        <div className="relative aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg border border-cyan-400">
          <video
            className="w-full h-full rounded-xl pointer-events-none select-none"
            src="https://videos.pexels.com/video-files/25744121/11904048_2560_1440_25fps.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-cyan-400 opacity-40 animate-pulse"></div>
        </div>
      </div>

      <Particle x="10%" y="20%" size={8} delay="0s" color="cyan" />
      <Particle x="80%" y="15%" size={12} delay="1.5s" color="purple" />
      <Particle x="50%" y="80%" size={10} delay="0.8s" color="cyan" />
      <Particle x="30%" y="60%" size={6} delay="2s" color="purple" />
      <Particle x="75%" y="75%" size={7} delay="1.2s" color="cyan" />
    </section>
  );
};

const Particle = ({ x, y, size = 8, delay = "0s", color = "cyan" }) => {
  const bgColor =
    color === "purple" ? "rgba(139, 92, 246, 0.7)" : "rgba(6, 182, 212, 0.7)";

  return (
    <div
      className="absolute rounded-full blur-lg animate-float"
      style={{
        width: size,
        height: size,
        top: y,
        left: x,
        animationDelay: delay,
        backgroundColor: bgColor,
      }}
    />
  );
};

export default AiVideoSection;
