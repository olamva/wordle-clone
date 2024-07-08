"use client";

import allowedGuesses from "@/public/wordle-allowed-guesses.json";
import answers from "@/public/wordle-answers-alphabetical.json";
import { useEffect, useRef } from "react";

const WordleGrid = () => {
  const AMT_ROWS = 6;
  const AMT_COLS = 5;

  let currentRow = 0;
  let nextEmptyCol = 0;
  let currentWord: string[] = [];
  let isDone = false;

  const wordToCheck = answers[Math.floor(Math.random() * answers.length)];
  // console.log(wordToCheck);
  // const wordToCheck = "crane";

  const divRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isDone) return;
    if (divRef.current === null) return;
    const divs = divRef.current.children;
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentRow < AMT_ROWS && currentWord.length === AMT_COLS) {
        return handleCheck(divs);
      }
    }

    if (e.key === "Backspace" && nextEmptyCol > 0) {
      divs[currentRow * AMT_COLS + nextEmptyCol - 1].innerHTML = "";
      currentWord.pop();
      if (nextEmptyCol > 0) nextEmptyCol--;
      return;
    }
    if (nextEmptyCol === AMT_COLS) return;
    const nextDiv = divs[currentRow * AMT_COLS + nextEmptyCol];
    if (e.key.length !== 1 || !/[a-z]/.test(e.key)) return;
    if (nextEmptyCol === AMT_COLS - 1 && nextDiv.innerHTML !== "") return;
    nextDiv.innerHTML = e.key.toUpperCase();
    currentWord.push(e.key.toLowerCase());
    if (nextEmptyCol !== AMT_COLS) nextEmptyCol++;
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
        box.classList.add("bg-green-400");
        box.classList.add("dark:bg-green-500");
      } else if (currentWord.includes(letter)) {
        const box = divs[currentRow * AMT_COLS + currentWord.indexOf(letter)];
        box.classList.add("bg-yellow-400");
        box.classList.add("dark:bg-yellow-500");
      }
    });
    if (validationCheck === 1) {
      alert("You won!");
      isDone = true;
      return;
    }
    if (currentRow === AMT_ROWS - 1) {
      alert("You lost... the word was: " + wordToCheck.toUpperCase());
      isDone = true;
      return;
    }
    currentRow++;
    nextEmptyCol = 0;
    currentWord = [];
    return;
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-2" ref={divRef}>
        {Array.from({ length: AMT_ROWS * AMT_COLS }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-zinc-700 rounded h-20 dark:text-white text-center items-center justify-center flex text-4xl"
          ></div>
        ))}
      </div>
    </>
  );
};

export default WordleGrid;
