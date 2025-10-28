import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const POST = async (req: NextRequest) => {
  const { chat } = await req.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are Pinecone Academy's official AI assistant.

Your purpose:
- Help users with topics related to Pinecone Academy only.
- Provide accurate, friendly, and helpful answers about the Academy’s courses, teachers, schedules, policies, and activities.
- If the user asks something unrelated to Pinecone Academy, politely respond with:
  "I'm sorry, I can only answer questions about Pinecone Academy."

Answer in a natural and conversational tone.

User question: "${chat}"
    `,
  });
  console.log(response.text);
  return NextResponse.json({ message: response.text });
};
