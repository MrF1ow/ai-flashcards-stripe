import { useUser } from "@clerk/nextjs";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { FlashcardProps } from "@/types";
import DefaultLayout from "@/layouts/default";
import Flashcard from "@/components/flashcard";
import { title } from "@/components/primitives";

const FlashcardPage = () => {
  const { user } = useUser();
  const [flashcards, setFlashcards] = useState<FlashcardProps[]>([]);
  const [flipped, setFlipped] = useState({});

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  const db = getFirestore();

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards: any = [];
      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [search, user]);

  return (
    <DefaultLayout>
      <div className="pb-8">
        <h1 className={title({ size: "lg", color: "black" })}>Flashcards</h1>
      </div>
      <div className="grid grid-col-3 gap-4 h-4/5 overflow-y-auto">
        {flashcards.length > 0 &&
          flashcards.map((flashcard, index) => (
            <Flashcard
              key={index}
              front={flashcard.front}
              back={flashcard.back}
            />
          ))}
      </div>
    </DefaultLayout>
  );
};

export default FlashcardPage;
