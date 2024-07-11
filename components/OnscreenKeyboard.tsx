import { keys } from "@/app/data/constants";
import OnscreenLetter from "@/components/OnscreenLetter";

const OnscreenKeyboard = () => {
  return (
    <div className="flex justify-center mt-12">
      <div className="flex flex-col items-center">
        {keys.map((row, i) => (
          <div key={i} className="flex gap-1 mt-1">
            {row.map((letter) => (
              <OnscreenLetter key={letter} letter={letter} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnscreenKeyboard;
