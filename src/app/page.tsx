

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/galaxy.mp4" type="video/mp4" />
        {/* Fallback text */}
        Your browser does not support the video tag.
      </video>
      {/* Overlay for gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 opacity-80 z-10"></div>
      {/* Main Content */}
      <main className="relative z-20 flex flex-col items-center justify-center font-nunito px-4 min-h-screen">
        {/* App Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          💭 Dream Journal
        </h1>
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-purple-700 mb-6 text-center max-w-xl">
          Welcome to your personal dream diary!{" "}
          <span className="text-2xl">✨😴</span>
        </p>
        {/* Features */}
        <div className="bg-white bg-opacity-80 rounded-2xl shadow-2xl p-10 mb-8 min-h-[350px] max-w-2xl w-full flex flex-col justify-center">
          <ul className="space-y-6 text-blue-800 text-lg">
            <li className="flex items-start gap-2">
              <span className="text-2xl">🌑</span>
              <span>
                <strong>Dream Meaning:</strong> Get emotional, psychological,
                and cultural interpretations of your dreams.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-2xl">🐍</span>
              <span>
                <strong>Mood Context:</strong> Your mood and stress levels help
                us analyze your dreams more deeply.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-2xl">📔</span>
              <span>
                <strong>Dream Diary:</strong> Save and revisit your dreams
                anytime for reflection and insight.
              </span>
            </li>
          </ul>
        </div>
        {/* Call to Action */}
        <a
          href="/journal"
          className="bg-purple-400 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all text-lg flex items-center gap-2"
        >
          Start Your Dream Journal <span className="text-xl">✨</span>
        </a>
        {/* Footer */}
        <footer className="mt-10 text-blue-700 text-sm opacity-70">
          Made with love & dreams 💜
        </footer>
      </main>
    </div>
  );
}
