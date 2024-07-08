"use client";

import Refresh from "@/public/refresh.svg";
import allowedGuesses from "@/public/wordle-allowed-guesses.json";
import answers from "@/public/wordle-answers-alphabetical.json";
import { useEffect, useRef, useState } from "react";

const WordleGrid = () => {
  const AMT_ROWS = 6;
  const AMT_COLS = 5;

  let currentRow = 0;
  let currentCol = 0;
  let currentWord: string[] = [];
  const [isDone, setIsDone] = useState<boolean>(false);

  const wordToCheck = answers[Math.floor(Math.random() * answers.length)];

  const divRef = useRef<HTMLDivElement>(null);

  const [displayEndScreen, setDisplayEndScreen] = useState<boolean>(false);
  const [endScreenText, setEndScreenText] = useState<string>("");

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isDone) {
      if (e.key === "Escape") setDisplayEndScreen(false);
      return;
    }
    if (divRef.current === null) return;
    if (e.metaKey || e.shiftKey || e.altKey || e.ctrlKey) return;
    if (displayEndScreen) return;

    const divs = divRef.current.children;
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentRow < AMT_ROWS && currentWord.length === AMT_COLS) {
        handleCheck(divs);
      }
      return;
    }

    if (e.key === "Backspace" && currentCol > 0) {
      divs[currentRow * AMT_COLS + currentCol - 1].innerHTML = "";
      currentWord.pop();
      if (currentCol > 0) currentCol--;
      return;
    }

    if (currentCol === AMT_COLS) return;
    const nextDiv = divs[currentRow * AMT_COLS + currentCol];
    if (e.key.length !== 1 || !/[a-zA-Z]/.test(e.key)) return;
    if (currentCol === AMT_COLS - 1 && nextDiv.innerHTML !== "") return;
    nextDiv.innerHTML = e.key.toUpperCase();
    currentWord.push(e.key.toLowerCase());
    if (currentCol !== AMT_COLS) currentCol++;
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /**
   * @returns `-1` if guess is invalid, `0` if guess is incorrect, or `1` if guess is correct
   */
  const validateGuess = (guess: string[]) => {
    const guessToCheck = guess.join("");
    if (wordToCheck === guessToCheck) return 1;
    if (allowedGuesses.includes(guessToCheck) || answers.includes(guessToCheck))
      return 0;
    return -1;
  };

  const handleCheck = (divs: HTMLCollection) => {
    const validationCheck = validateGuess(currentWord);
    if (validationCheck === -1) {
      alert("Invalid guess");
      return;
    }
    wordToCheck.split("").forEach((letter, i) => {
      if (letter === currentWord[i]) {
        const box = divs[currentRow * AMT_COLS + i];
        if (box.classList.contains("bg-zinc-700")) {
          box.classList.remove("bg-zinc-700");
        }
        if (box.classList.contains("bg-yellow-400")) {
          box.classList.remove("bg-yellow-500");
        }
        box.classList.add("bg-green-500");
      } else if (currentWord.includes(letter)) {
        const indexes = findAllMatchingLetterIndexes(currentWord, letter);
        for (let index of indexes) {
          const box = divs[currentRow * AMT_COLS + index];
          if (
            box.classList.contains("bg-yellow-400") ||
            box.classList.contains("bg-green-400") ||
            box.classList.contains("bg-zinc-700")
          ) {
            continue;
          }
          box.classList.add("bg-yellow-500");
          break;
        }
      }
    });
    for (let i = 0; i < AMT_COLS; i++) {
      const box = divs[currentRow * AMT_COLS + i];
      if (
        box.classList.contains("bg-green-500") ||
        box.classList.contains("bg-yellow-500")
      ) {
        continue;
      }
      box.classList.add("bg-zinc-700");
    }

    if (validationCheck === 1) {
      setEndScreenText("You win!");
      setIsDone(true);
      showEndScreen();
      return;
    }
    if (currentRow === AMT_ROWS - 1) {
      setEndScreenText("You lost... The word was " + wordToCheck.toUpperCase());
      setIsDone(true);
      showEndScreen();
      return;
    }
    currentRow++;
    currentCol = 0;
    currentWord = [];
    return;
  };

  const findAllMatchingLetterIndexes = (
    word: string[],
    letter: string,
  ): number[] => {
    const indexes: number[] = [];
    word.forEach((char, i) => {
      if (char === letter) {
        indexes.push(i);
      }
    });
    return indexes;
  };

  const showEndScreen = () => {
    setTimeout(() => {
      setDisplayEndScreen(true);
    }, 500);
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-2 w-fit" ref={divRef}>
        {Array.from({ length: AMT_ROWS * AMT_COLS }).map((_, i) => (
          <div
            key={i}
            className="border rounded size-20 text-white items-center justify-center flex text-4xl"
          />
        ))}
      </div>
      {displayEndScreen && (
        <div
          className="backdrop-blur-sm size-full  justify-center items-center flex fixed"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setDisplayEndScreen(false);
            }
          }}
        >
          <div className="text-white bg-zinc-800 items-center flex rounded p-8 flex-col">
            {endScreenText}
            <div className="h-4" />
            <div
              className="bg-zinc-900 p-2 rounded-lg flex-row flex items-center justify-center cursor-pointer"
              onClick={() => location.reload()}
            >
              Reset?
              <div className="w-2" />
              <Refresh />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WordleGrid;
