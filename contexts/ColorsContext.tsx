import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

interface ColorsContextType {
  greenLetters: string[];
  yellowLetters: string[];
  grayLetters: string[];
  setGreenLetters: Dispatch<SetStateAction<string[]>>;
  setYellowLetters: Dispatch<SetStateAction<string[]>>;
  setGrayLetters: Dispatch<SetStateAction<string[]>>;
}

const initialContextValue: ColorsContextType = {
  greenLetters: [],
  yellowLetters: [],
  grayLetters: [],
  setGreenLetters: () => {},
  setYellowLetters: () => {},
  setGrayLetters: () => {},
};

const ColorsContext = createContext<ColorsContextType>(initialContextValue);

interface ColorsProviderProps {
  children: ReactNode;
}

const ColorsProvider: FC<ColorsProviderProps> = ({
  children,
}: ColorsProviderProps) => {
  const [greenLetters, setGreenLetters] = useState<string[]>([]);
  const [yellowLetters, setYellowLetters] = useState<string[]>([]);
  const [grayLetters, setGrayLetters] = useState<string[]>([]);

  const contextValue: ColorsContextType = {
    greenLetters,
    yellowLetters,
    grayLetters,
    setGreenLetters,
    setYellowLetters,
    setGrayLetters,
  };

  return (
    <ColorsContext.Provider value={contextValue}>
      {children}
    </ColorsContext.Provider>
  );
};

export { ColorsContext, ColorsProvider };
