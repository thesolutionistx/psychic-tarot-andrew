# app/api/draw-cards/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(req, { ...authOptions });
  const body = await req.json();
  if (!body.drawnCards) {
    return NextResponse.json({ success: false, error: "No cards" }, { status: 400 });
  }

  // If user is logged in, link reading to user; otherwise userId=0
  let userId = 0;
  if (session?.user?.id) {
    userId = Number(session.user.id);
  }

  const spreadCards = JSON.stringify(body.drawnCards);
  const reading = await prisma.reading.create({
    data: {
      userId,
      spreadCards
    }
  });

  return NextResponse.json({ success: true, readingId: reading.id });
}
