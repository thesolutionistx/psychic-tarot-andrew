import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { Configuration, OpenAIApi } from "openai";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(req, { ...authOptions });
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }
    const body = await req.json();
    const readingId = body.readingId;
    if (!readingId) {
      return NextResponse.json({ success: false, error: "No reading ID" }, { status: 400 });
    }
    const userId = Number(session.user.id);

    // Check user
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }
    if (user.tokens < 5) {
      return NextResponse.json({ success: false, error: "Insufficient tokens" }, { status: 400 });
    }

    // Retrieve reading
    const reading = await prisma.reading.findUnique({ where: { id: readingId } });
    if (!reading || reading.userId !== userId) {
      return NextResponse.json({ success: false, error: "Reading not found" }, { status: 404 });
    }

    // Deduct tokens
    await prisma.user.update({
      where: { id: userId },
      data: { tokens: user.tokens - 5 }
    });

    // Prepare GPT request
    const parsedSpread = JSON.parse(reading.spreadCards || "[]");
    const cardList = parsedSpread
      .map((c: any) => `${c.name}${c.reversed ? " (Reversed)" : ""}`)
      .join(", ");

    const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(config);

    const systemPrompt = `
You are Psychic Tarot Andrew, an expert tarot reader. Provide deep, empathetic, spiritual guidance in your responses.
`;

    const userPrompt = `
The user drew these cards: ${cardList}.
Please provide an advanced reading in Psychic Tarot Andrew's voice.
`;

    const resp = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    });

    const gptText = resp.data.choices[0].message?.content || "";

    // Save advanced text
    await prisma.reading.update({
      where: { id: readingId },
      data: { advancedText: gptText }
    });

    return NextResponse.json({
      success: true,
      advancedReading: gptText,
      remainingTokens: user.tokens - 5
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
