import Backspace from "@/public/backspace.svg";
import { MouseEvent } from "react";

const OnscreenLetter = ({ letter }: { letter: string }) => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    const event = new KeyboardEvent("keydown", { key: letter });
    document.dispatchEvent(event);
  };

  return (
    <div
      className="border border-zinc-600 bg-zinc-800 rounded h-16 min-w-16 w-fit text-white items-center justify-center flex text-2xl p-2 cursor-pointer select-none"
      onClick={handleClick}
    >
      {letter === "Backspace" ? <Backspace /> : letter}
    </div>
  );
};

export default OnscreenLetter;
