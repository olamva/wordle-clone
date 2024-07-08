import DarkModeToggle from "@/components/DarkModeToggle";
import WordleGrid from "@/components/WordleGrid";

export default function Home() {
  return (
    <div className="px-44 py-4">
      <DarkModeToggle />
      <WordleGrid />
    </div>
  );
}
