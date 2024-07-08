import DarkModeToggle from "@/components/DarkModeToggle";
import WordleGrid from "@/components/WordleGrid";

export default function Home() {
  return (
    <>
      <div className="flex fixed w-screen">
        <div className="flex-grow" />
        <DarkModeToggle />
      </div>
      <div className="flex justify-center items-center h-screen">
        <WordleGrid />
      </div>
    </>
  );
}
