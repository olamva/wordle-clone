"use client";

import HardModeToggle from "@/components/HardModeToggle";
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
        <div className="text-white text-6xl font-thin flex justify-center pt-20">
          Wordle
        </div>
        <div className="mt-8 flex justify-center items-center">
          <Wordle isHardMode={isHardMode} />
        </div>
      </div>
    </>
  );
}
