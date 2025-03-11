import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await getServerSession(req, { ...authOptions });
  if (!session?.user?.id) {
    return NextResponse.json([], { status: 200 });
  }
  const userId = Number(session.user.id);
  const readings = await prisma.reading.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(readings);
}
