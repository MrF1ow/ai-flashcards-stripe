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

      // Reference to the collection where the flashcard sets are stored
      const userDocRef = doc(collection(db, "users"), user.id);
      const flashcardsCollectionRef = collection(userDocRef, search);

      // Get all flashcard documents within the specific set
      const querySnapshot = await getDocs(flashcardsCollectionRef);

      const flashcards: any = [];
      querySnapshot.forEach((doc) => {
        flashcards.push(doc.data()); // Assuming each document represents a flashcard
      });

      if (flashcards.length > 0) {
        setFlashcards(flashcards);
      } else {
        console.log("No flashcards found for this set.");
      }
    }

    getFlashcard();
  }, [search, user]);

  return (
    <DefaultLayout>
      <div className="pb-8">
        <h1 className={title({ size: "lg", color: "black" })}>{search}</h1>
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
