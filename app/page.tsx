"use client";

import HardModeToggle from "@/components/HardModeToggle";
import OnscreenKeyboard from "@/components/OnscreenKeyboard";
import Wordle from "@/components/Wordle";
import { useEffect, useState } from "react";

export default function Home() {
  const [isHardMode, setIsHardMode] = useState<boolean>(false);

  useEffect(() => {
    const savedHardMode = localStorage.getItem("isHardMode");
    if (savedHardMode !== null) setIsHardMode(JSON.parse(savedHardMode));
  }, []);

  return (
    <>
      <div className="h-screen">
        <HardModeToggle isHardMode={isHardMode} setIsHardMode={setIsHardMode} />
        <div className="text-white text-5xl font-thin flex justify-center pt-8">
          Wordle
        </div>
        <div className="mt-10 flex justify-center items-center">
          <Wordle isHardMode={isHardMode} />
        </div>
        <OnscreenKeyboard />
      </div>
    </>
  );
}
