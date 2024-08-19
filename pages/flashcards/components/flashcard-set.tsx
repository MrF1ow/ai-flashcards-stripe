import { useRouter } from "next/router";
import { Card, CardBody } from "@nextui-org/card";

import { title } from "@/components/primitives";

const FlashcardSet = ({ name }: { name: string }) => {
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <Card
      onClick={() => handleCardClick(name)}
      className="transition-transform transform hover:scale-105"
      shadow="md"
    >
      <CardBody>
        <h1 className={title({ size: "sm", color: "black" })}>{name}</h1>
      </CardBody>
    </Card>
  );
};

export default FlashcardSet;
