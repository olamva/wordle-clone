import WordleGrid from "@/components/WordleGrid";

export default function Home() {
  return (
    <>
      <div className="relative h-screen">
        <div className="text-white text-6xl font-thin flex justify-center pt-20">
          Wordle
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <WordleGrid />
        </div>
      </div>
    </>
  );
}
