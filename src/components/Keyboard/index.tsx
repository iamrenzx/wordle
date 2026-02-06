import type { KeyValue } from "../../types";

type KeyboardProps = {
  rows: KeyValue[][];
  onChar: (value: KeyValue) => void;
  onDelete: () => void;
  onEnter: () => void;
};

export const Keyboard = ({
  rows,
  onChar,
  onDelete,
  onEnter,
}: KeyboardProps) => {
  return (
    <div className="w-full max-w-[500px] mt-4 px-2 pb-8 flex flex-col gap-2">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center gap-1.5 w-full touch-none"
        >
          {row.map((key) => {
            const isSpecial = key === "ENTER" || key === "⌫";

            return (
              <button
                key={key}
                onClick={() => {
                  if (key === "ENTER") onEnter();
                  else if (key === "⌫") onDelete();
                  else onChar(key);
                }}
                className={`
                  h-14 px-1 sm:px-2 md:px-4 rounded font-bold uppercase flex items-center justify-center cursor-pointer select-none transition-colors
                  ${isSpecial ? "flex-1 text-xs" : "flex-1 text-xs md:text-sm"}
                  bg-[#d3d6da] hover:bg-[#939598] active:bg-[#565758]
                `}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
