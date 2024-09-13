"use client";

import { useEffect, useState } from "react";
import {
  doc,
  collection,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";

import FlashcardSet from "./components/flashcard-set";

import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { FlashcardSetProps } from "@/types";
import app from "@/lib/firebaseConfig";

export default function FlashcardPage() {
  const { user } = useUser();
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSetProps[]>([]);
  const db = getFirestore(app);

  useEffect(() => {
    async function getFlashcardSets() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcardSets || [];

        setFlashcardSets(collections);
      } else {
        await setDoc(docRef, { flashcardSets: [] });
      }
    }
    getFlashcardSets();
  }, [user]);

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center">
        <div className="pb-8">
          <h1 className={title({ size: "lg", color: "black" })}>Flashcards</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" >
        {flashcardSets.map((flashcardSet: FlashcardSetProps, index: number) => (
          <FlashcardSet key={index} name={flashcardSet.name} />
        ))}
      </div>
    </DefaultLayout>
  );
}
