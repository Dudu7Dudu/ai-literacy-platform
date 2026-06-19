import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const module = await prisma.module.create({
    data: {
      title: body.title,
      description: body.description,
      orderIndex: 1,
    },
  });

  return NextResponse.json(module);
}