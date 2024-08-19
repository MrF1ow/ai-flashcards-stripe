import { useState } from "react";
import { FlashcardProps } from "@/types";
import { Card, CardBody } from "@nextui-org/card";
import { motion } from "framer-motion";

const Flashcard = ({ front, back }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-80 h-64 perspective" onClick={handleFlip}>
      <motion.div
        className="absolute w-full h-full transition-transform transform-style-preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute w-full h-full backface-hidden">
          <Card shadow="md" className="h-full flex items-center justify-center">
            <CardBody className="flex justify-center items-center h-full w-full">
              { isFlipped ? back : front }
            </CardBody>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;
