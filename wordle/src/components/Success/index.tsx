import { Fireworks } from "../Fireworks";
import "./styles.css";

export const Success = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Fireworks />

      <div className="bg-black/60 backdrop-blur-md border-2 border-pink-500 p-8 rounded-3xl shadow-[0_0_50px_rgba(236,72,153,0.5)] text-center animate-pop relative z-10">
        <h2 className="text-5xl font-black text-pink-400 mb-2 drop-shadow-md">
          HAPPY VALENTINES! 🌸
        </h2>
        <p className="text-white text-lg mb-6 opacity-90">
          You found the word!
        </p>

        <div className="flex justify-center gap-2 mb-8">
          {["H", "O", "N", "E", "Y"].map((l, i) => (
            <div
              key={i}
              className="w-12 h-12 bg-pink-600 text-white flex items-center justify-center font-bold rounded-lg shadow-lg"
            >
              {l}
            </div>
          ))}
        </div>

        <button
          onClick={() => window.location.reload()}
          className="bg-pink-500 hover:bg-pink-400 text-white font-bold py-4 px-10 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-pink-500/50 shadow-lg"
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
};
