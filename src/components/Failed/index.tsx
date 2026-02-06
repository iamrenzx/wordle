import "./styles.css";

export const Failed = ({ solution }: { solution: string }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute top-[-5%] text-2xl animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            💔
          </div>
        ))}
      </div>

      <div className="bg-[#1a1a1b] border-2 border-gray-600 p-8 rounded-3xl shadow-2xl text-center animate-pop relative z-10 max-w-[90%]">
        <h2 className="text-4xl font-black text-gray-400 mb-2">OH NO!</h2>
        <p className="text-gray-300 text-lg mb-6">Maybe next time?</p>

        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
            The word was
          </p>
          <div className="flex justify-center gap-2">
            {solution.split("").map((l, i) => (
              <div
                key={i}
                className="w-10 h-10 bg-gray-800 border border-gray-600 flex items-center justify-center font-bold rounded text-white"
              >
                {l}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-10 rounded-full transition-all cursor-pointer shadow-lg"
        >
          TRY AGAIN
        </button>
      </div>
    </div>
  );
};
