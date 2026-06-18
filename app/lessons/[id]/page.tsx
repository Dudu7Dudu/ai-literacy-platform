import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const lesson = await prisma.lesson.findUnique({
  where: {
    id,
  },
  include: {
    quizzes: true,
  },
});

if (!lesson) {
  return <div>Lesson not found</div>;
}

  return (
    <div>
      <h1>{lesson.title}</h1>

      <p>{lesson.content}</p>
    </div>
  );
}