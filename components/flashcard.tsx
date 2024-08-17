import { useState } from "react";
import { FlashcardProps } from "@/types";
import { Card } from "@nextui-org/card";

const Flashcard = ({ front, back }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card
      onClick={handleFlip}
      className="transition-transform transform hover:scale-105"
      shadow="md"
    >
      <div
        className={`flex items-center justify-center w-full h-full transition-transform transform-gpu ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="w-full h-full bg-white shadow-lg rounded-lg p-4 flex items-center justify-center">
          <p className="text-2xl font-bold text-center">{front}</p>
        </div>
        <div className="w-full h-full bg-white shadow-lg rounded-lg p-4 flex items-center justify-center rotate-y-180">
          <p className="text-2xl font-bold text-center">{back}</p>
        </div>
      </div>
    </Card>
  );
};

export default Flashcard;
