import { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import ReactCardFlip from "react-card-flip";

import { FlashcardProps } from "@/types";

const Flashcard = ({ front, back }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip flipDirection="vertical" isFlipped={isFlipped}>
      <Card
        isPressable
        className="w-full h-[150px] flex items-center justify-center"
        shadow="md"
        onPress={handleFlip}
      >
        <CardBody className="flex justify-center items-center h-full w-full">
          {front}
        </CardBody>
      </Card>
      <Card
        isPressable
        className="w-full h-[150px] flex items-center justify-center"
        shadow="md"
        onPress={handleFlip}
      >
        <CardBody className="flex justify-center items-center h-full w-full">
          {back}
        </CardBody>
      </Card>
    </ReactCardFlip>
  );
};

export default Flashcard;
