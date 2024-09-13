import { FlashcardProps } from "@/types";
import Flashcard from "./flashcard";

export default function FlashcardGrid({
  flashcards,
}: {
  flashcards: FlashcardProps[];
}) {
  return (
    <div className="w-full flex items-center justify-center overflow-x-hidden">
      <div className="w-full grid grid-cols-3 gap-4 h-2/5 overflow-y-auto overflow-x-hidden">
        {flashcards.length > 0 &&
          flashcards.map((flashcard, index) => (
            <Flashcard
              key={index}
              back={flashcard.back}
              front={flashcard.front}
            />
          ))}
      </div>
    </div>
  );
}
