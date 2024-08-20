import { useUser } from "@clerk/nextjs";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
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

      const flashCardSetRef = doc(
        db,
        "users",
        user.id,
        "flashcardSets",
        search
      );

      const docSnap = await getDoc(flashCardSetRef);

      if (docSnap.exists()) {
        const flashcards = docSnap.data().flashcards;
        console.log("Flashcards:", flashcards);
        setFlashcards(flashcards);
      } else {
        console.log("No such document!");
        setFlashcards([]);
      }
    }

    getFlashcard();
  }, [search, user]);

  return (
    <DefaultLayout>
      <div className="pb-8">
        <h1 className={title({ size: "lg", color: "black" })}>{search}</h1>
      </div>
      <div className="h-screen flex flex-row flex-wrap gap-4">
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
