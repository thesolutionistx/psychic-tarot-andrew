# app/api/buy-tokens/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(req, { ...authOptions });
  if (!session?.user?.id) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  const userId = Number(session.user.id);
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  // Here you'd integrate with Stripe, PayPal, etc. to confirm real payment. 
  // For now, this is a mock that simply adds 20 tokens.
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { tokens: user.tokens + 20 }
  });

  return NextResponse.json({ success: true, tokens: updated.tokens });
}
