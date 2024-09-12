'use client'

import { useUser } from "@clerk/nextjs";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { FlashcardProps } from "@/types";
import DefaultLayout from "@/layouts/default";
import Flashcard from "@/components/flashcard";
import { title } from "@/components/primitives";
import app from "@/lib/firebaseConfig";

const FlashcardPage = () => {
  const { user } = useUser();
  const [flashcards, setFlashcards] = useState<FlashcardProps[]>([]);

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  const db = getFirestore(app);

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      const flashCardSetRef = doc(
        db,
        "users",
        user.id,
        "flashcardSets",
        search,
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
      <div className="w-full flex items-center justify-center">
        <div className="w-full grid grid-cols-3 gap-4 h-2/5 overflow-y-auto">
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
    </DefaultLayout>
  );
};

export default FlashcardPage;
