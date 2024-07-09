import { AMT_COLS, AMT_ROWS } from "@/app/data/constants";
import { RefObject } from "react";

const WordleGrid = ({ divRef }: { divRef: RefObject<HTMLDivElement> }) => {
  return (
    <div className="grid grid-cols-5 gap-2 w-fit" ref={divRef}>
      {Array.from({ length: AMT_ROWS * AMT_COLS }).map((_, i) => (
        <div
          key={i}
          className="border border-zinc-600 rounded size-20 text-white items-center justify-center flex text-4xl "
        />
      ))}
    </div>
  );
};

export default WordleGrid;
