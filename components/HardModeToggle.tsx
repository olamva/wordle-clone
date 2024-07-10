"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface HardModeToggleProps {
  isHardMode: boolean;
  setIsHardMode: Dispatch<SetStateAction<boolean>>;
}
const HardModeToggle = ({ isHardMode, setIsHardMode }: HardModeToggleProps) => {
  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toggleRef.current === null) return;
    const child = toggleRef.current.children[0];
    if (isHardMode) {
      toggleRef.current.classList.remove("bg-zinc-600");
      toggleRef.current.classList.add("bg-green-500");
      child.classList.remove("ml-[1px]");
      child.classList.add("translate-x-full");
    } else {
      toggleRef.current.classList.remove("bg-green-500");
      toggleRef.current.classList.add("bg-zinc-600");
      child.classList.remove("translate-x-full");
      child.classList.add("ml-[1px]");
    }
  }, [isHardMode]);

  const toggleHardMode = () => {
    setIsHardMode((prev) => !prev);
  };

  return (
    <div
      className="absolute top-0 right-0 text-white font-extralight flex items-center cursor-pointer m-1"
      onClick={toggleHardMode}
    >
      Hard mode?
      <div
        className="rounded-lg w-7 h-4 border-zinc-700 border bg-zinc-600 ml-1 items-center flex transition-colors"
        ref={toggleRef}
      >
        <div className="bg-zinc-800 size-3 rounded-full ml-[1px] transition-all transform" />
      </div>
    </div>
  );
};

export default HardModeToggle;
