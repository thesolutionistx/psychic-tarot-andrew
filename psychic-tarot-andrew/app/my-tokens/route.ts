# app/api/my-tokens/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await getServerSession(req, { ...authOptions });
  if (!session?.user?.id) {
    return NextResponse.json({ tokens: 0 });
  }
  const userId = Number(session.user.id);
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return NextResponse.json({ tokens: user?.tokens || 0 });
}
