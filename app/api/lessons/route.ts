import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const lesson = await prisma.lesson.create({
    data: {
      title: body.title,
      content: body.content,
      moduleId: body.moduleId,
      orderIndex: 1,
    },
  });

  return NextResponse.json(lesson);
}