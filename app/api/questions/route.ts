import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const question = await prisma.question.create({
    data: {
      text: body.text,
      quizId: body.quizId,
    },
  });

  return NextResponse.json(question);
}