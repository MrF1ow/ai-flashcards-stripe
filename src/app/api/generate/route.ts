import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { FlashcardProps } from "@/types";

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

export async function POST(req: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const openai = new OpenAI({
    apiKey: apiKey,
  });

  if (req.method !== "POST") {
    return NextResponse.json({  message: "Only POST requests are allowed" }, { status: 405 })
  }

  const data = await req.text();

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
  });

  if (completion.choices.length === 0) {
    return NextResponse.json({ message: "Failed to generate flashcards" }, { status: 500 });
  }

  const responseData = JSON.parse(completion.choices[0].message.content || "");

  // Check if the response data is in the correct format
  if (!isFlashcardPropsArray(responseData.flashcards)) {
    return NextResponse.json({ message: "Failed to generate flashcards" }, { status: 500 });
  }

  return NextResponse.json(responseData, { status: 200 });
}
