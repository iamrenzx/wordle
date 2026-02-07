import { useEffect, useState } from "react";
import { Keyboard } from "./components/Keyboard";
import type { KeyValue } from "./types";
import { Success } from "./components/Success";
import { Failed } from "./components/Failed";

export const App = () => {
  const cells = Array(30).fill(null);

  const rows: KeyValue[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
  ];

  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [page, setPage] = useState<string | null>(null);
  const solution = "ROSES";

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 6) {
      setCurrentGuess((prev) => prev + value);
    }
  };

  const onDelete = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const onEnter = () => {
    if (currentGuess.length !== 5) {
      return;
    }

    if (guesses.length >= 6) return;

    setGuesses((prev) => [...prev, currentGuess]);
    setCurrentGuess("");

    if (currentGuess === solution) {
      setPage("success");
    } else if (guesses.length === 5) {
      setPage("failed");
    }
  };

  const getLetterAt = (index: number) => {
    const row = Math.floor(index / 5);
    const col = index % 5;

    if (row < guesses.length) {
      return guesses[row][col];
    }

    if (row === guesses.length) {
      return currentGuess[col] || "";
    }

    return "";
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key.toUpperCase();

      if (key === "ENTER") {
        onEnter();
      } else if (key === "BACKSPACE") {
        onDelete();
      } else if (/^[A-Z]$/.test(key)) {
        onChar(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, guesses]);

  const getStatuses = () => {
    const statuses: { [key: string]: string } = {};

    guesses.forEach((word) => {
      word.split("").forEach((letter, i) => {
        if (letter === solution[i]) {
          statuses[letter] = "bg-correct text-white"; // Green
          return;
        }

        if (
          solution.includes(letter) &&
          statuses[letter] !== "bg-correct text-white"
        ) {
          statuses[letter] = "bg-present text-white"; // Yellow
          return;
        }

        if (!statuses[letter]) {
          statuses[letter] = "bg-absent text-white"; // Gray
        }
      });
    });

    return statuses;
  };

  const charStatuses = getStatuses();

  return (
    <div className="flex flex-col items-center w-full max-w-[500px] h-screen p-0 md:p-4">
      <header className="border-b border-border-empty w-full py-4 mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-widest uppercase">
          Jessica Wordle
        </h1>
      </header>

      {page === "success" && <Success solution={solution} />}

      {page === "failed" && <Failed solution={solution} />}

      <div className="flex flex-col items-center w-full">
        <div className="grid grid-cols-5 gap-1.5 w-full max-w-[350px]">
          {cells.map((_, i) => {
            const row = Math.floor(i / 5);
            const col = i % 5;
            const letter = getLetterAt(i);
            const isSubmitted = row < guesses.length;

            let statusClass = "border-border-empty";

            if (isSubmitted) {
              const word = guesses[row];
              const char = word[col];

              if (char === solution[col]) {
                statusClass = "bg-correct border-correct text-white";
              } else if (solution.includes(char)) {
                statusClass = "bg-present border-present text-white";
              } else {
                statusClass = "bg-absent border-absent text-white";
              }
            } else if (letter) {
              statusClass = "border-typing animate-pop";
            }

            return (
              <div
                key={i}
                className={`aspect-square flex items-center justify-center text-3xl font-bold uppercase border-2 transition-colors duration-500 ${statusClass}`}
              >
                {letter}
              </div>
            );
          })}
        </div>

        <div className="mt-auto w-full pb-8">
          <div className="flex flex-col gap-2">
            <Keyboard
              onDelete={onDelete}
              onEnter={onEnter}
              onChar={onChar}
              rows={rows}
              charStatuses={charStatuses}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
