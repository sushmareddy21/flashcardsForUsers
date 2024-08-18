import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const systemPrompt = `
You are a flashcard creator. Take the provided text and create exactly 10 flashcards from it. Each flashcard should have one question on the front and one sentence answer on the back. Return the flashcards in the following JSON format:
{
  "flashcards":[
    { 
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

export async function POST(req) {
  try {
    const data = await req.text();

    let model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    let result = await model.generateContentStream({
      contents: [
        {
          role: "model",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "user",
          parts: [{ text: data }],
        },
      ],
    });

    // Handle streamed content
    let fullResponseText = '';
    for await (const chunk of result.stream) {
      fullResponseText += chunk.text();
    }

    console.log("Full Response Text:", fullResponseText);

    // Parse the full response text as JSON
    let flashcards;
    try {
      flashcards = JSON.parse(fullResponseText);
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      return NextResponse.json({ error: "Failed to parse response" }, { status: 500 });
    }

    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards);
  } catch (error) {
    console.error("Error fetching chat response:", error);
    return NextResponse.json({ error: "Error fetching chat response" }, { status: 500 });
  }
}
