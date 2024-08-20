import { useEffect, useState } from "react";
import { FlashcardProps } from "@/types";
import { Card, CardBody } from "@nextui-org/card";
import { motion } from "framer-motion";
import ReactCardFlip from "react-card-flip";

const Flashcard = ({ front, back }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <Card
        shadow="md"
        className="w-[200px] h-[150px] flex items-center justify-center"
        isPressable
        onPress={handleFlip}
      >
        <CardBody className="flex justify-center items-center h-full w-full">
          {front}
        </CardBody>
      </Card>
      <Card
        shadow="md"
        className="w-[200px] h-[150px] flex items-center justify-center"
        isPressable
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
