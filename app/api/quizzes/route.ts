import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const quiz = await prisma.quiz.create({
    data: {
      title: body.title,
      lessonId: body.lessonId,
    },
  });

  return NextResponse.json(quiz);
}