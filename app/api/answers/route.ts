import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  const body = await request.json();

  const answer = await prisma.answer.create({
    data: {
      text: body.text,
      isCorrect: body.isCorrect,
      questionId: body.questionId,
      nextQuestionId:
        body.nextQuestionId,
    },
  });

  return NextResponse.json(answer);
}