import { useRouter } from "next/navigation";
import { Card, CardBody } from "@nextui-org/card";

import { title } from "@/components/primitives";

const FlashcardSet = ({ name }: { name: string }) => {
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/flashcard?id=${id}`);
    console.log("Clicked", id);
  };

  return (
    <Card
      isPressable
      className="transition-transform transform hover:scale-105 cursor-pointer"
      shadow="md"
      onPress={() => handleCardClick(name)}
    >
      <CardBody>
        <h1 className={title({ size: "sm", color: "black" })}>{name}</h1>
      </CardBody>
    </Card>
  );
};

export default FlashcardSet;
