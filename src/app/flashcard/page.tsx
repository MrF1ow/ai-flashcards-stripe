"use client";

import { useUser } from "@clerk/nextjs";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  writeBatch,
} from "firebase/firestore";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FlashcardProps } from "@/types";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import app from "@/lib/firebaseConfig";
import FlashcardGrid from "@/components/flashcard-grid";
import { Button } from "@nextui-org/button";

const FlashcardPage = () => {
  const { user } = useUser();
  const [flashcards, setFlashcards] = useState<FlashcardProps[]>([]);
  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  const db = getFirestore(app);

  if (!user) {
    return null;
  }

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

  const handleSubmitDelete = async () => {
    if (!search) {
      alert("Please provide a valid name for the flashcard set to delete.");
      return;
    }
    handleDeleteFlashcardSet(search!);
    router.push("/flashcards");
  };

  const handleDeleteFlashcardSet = async (setNameToDelete: string) => {
    if (!setNameToDelete.trim()) {
      alert("Please provide a valid name for the flashcard set to delete.");
      return;
    }

    try {
      const userDocRef = doc(collection(db, "users"), user.id);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        alert("User data not found.");
        return;
      }

      const batch = writeBatch(db);

      const userData = userDocSnap.data();
      const updatedSets = (userData.flashcardSets || []).filter(
        (set: { name: string }) => set.name !== setNameToDelete
      );

      batch.update(userDocRef, { flashcardSets: updatedSets });

      const setDocRef = doc(
        collection(userDocRef, "flashcardSets"),
        setNameToDelete
      );

      batch.delete(setDocRef);

      await batch.commit();

      alert("Flashcard set deleted successfully!");
    } catch (error) {
      console.error("Error deleting flashcard set:", error);
      alert(
        "An error occurred while deleting the flashcard set. Please try again."
      );
    }
  };

  return (
    <DefaultLayout>
      <div className="pb-8 flex flex-row justify-between items-center">
        <h1 className={title({ size: "lg", color: "black" })}>{search}</h1>
        <Button
          color="danger"
          variant="light"
          onClick={handleSubmitDelete}
        >
          Delete
        </Button>
      </div>
      <FlashcardGrid flashcards={flashcards} />
    </DefaultLayout>
  );
};

export default FlashcardPage;
