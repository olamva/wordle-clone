import OnscreenLetter from "@/components/OnscreenLetter";

const OnscreenKeyboard = () => {
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];

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
