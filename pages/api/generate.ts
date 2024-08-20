import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { FlashcardProps } from "../../types";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

function isFlashcardProps(data: any): data is FlashcardProps {
  return (
    typeof data === "object" &&
    data !== null &&
    "front" in data &&
    "back" in data &&
    typeof data.front === "string" &&
    typeof data.back === "string"
  );
}

function isFlashcardPropsArray(data: any): data is FlashcardProps[] {
  return Array.isArray(data) && data.every(isFlashcardProps);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const openai = new OpenAI({
    apiKey: apiKey,
  });

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const data = req.body;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
  });

  if (completion.choices.length === 0) {
    return res.status(500).json({ message: "Failed to generate flashcards" });
  }

  const responseData = JSON.parse(completion.choices[0].message.content || "");

  // Check if the response data is in the correct format
  if (!isFlashcardPropsArray(responseData.flashcards)) {
    return res.status(500).json({ message: "Invalid flashcard data return format" });
  }

  return res.status(200).json(responseData.flashcards);
}
