"use client";

import { SetStateAction, useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {
  doc,
  collection,
  getDoc,
  writeBatch,
  getFirestore,
} from "firebase/firestore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useUser } from "@clerk/nextjs";

import DefaultLayout from "@/layouts/default";
import PopupLayout from "@/layouts/popup";
import { title } from "@/components/primitives";
import Flashcard from "@/components/flashcard";
import { FlashcardProps } from "@/types";

export default function GeneratePage() {
  const [text, setText] = useState<string>("");
  const [flashcards, setFlashcards] = useState<FlashcardProps[]>([]);
  const [setName, setSetName] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const db = getFirestore();
  const user = useUser().user;

  if (!user) {
    return null;
  }

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      console.log(`generate data: ${JSON.stringify(data, null, 2)}`);
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

  const handleSaveFlashcards = async () => {
    if (!setName.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

    try {
      const userDocRef = doc(collection(db, "users"), user.id);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [
          ...(userData.flashcardSets || []),
          { name: setName },
        ];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      alert("Flashcards saved successfully!");
      onOpenChange();
      setSetName("");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center">
        <div className="pb-8">
          <h1 className={title({ size: "lg", color: "black" })}>
            Generate Your Flashcards
          </h1>
        </div>
        <div className="w-full flex flex-col items-center gap-4">
          <Textarea
            isRequired
            variant="bordered"
            value={text}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setText(e.target.value)
            }
            label="Enter Text"
            labelPlacement="outside"
            placeholder="Enter text to generate flashcards"
            fullWidth={true}
          />
          <Button onClick={handleSubmit} variant="shadow" color="secondary">
            Generate Flashcards
          </Button>
          <div className="w-full flex items-center justify-center">
            <div className="w-full grid grid-cols-3 gap-4 h-2/5 overflow-y-auto">
              {flashcards.length > 0 &&
                flashcards.map((flashcard, index) => (
                  <Flashcard
                    key={index}
                    front={flashcard.front}
                    back={flashcard.back}
                  />
                ))}
            </div>
          </div>
          {flashcards.length > 0 && (
            <Button onPress={onOpen} variant="shadow" color="secondary">
              Save Flashcards
            </Button>
          )}
        </div>
      </div>
      <PopupLayout>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalHeader>Save Flashcards</ModalHeader>
            <ModalBody>
              <p>Enter a name for the flashcard set:</p>
              <Input
                isRequired
                type="text"
                label="Set Name"
                defaultValue="Chemistry"
                className="max-w-xs"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setSetName(e.target.value)
                }
                value={setName}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={handleSaveFlashcards}
                variant="ghost"
                color="success"
              >
                Save
              </Button>
              <Button onClick={onOpenChange} variant="light" color="danger">
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </PopupLayout>
    </DefaultLayout>
  );
}
