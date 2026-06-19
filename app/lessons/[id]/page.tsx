import { prisma } from "@/lib/prisma";
import Link from "next/link";
import QuizComponent from "@/app/components/QuizComponent";

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
      quizzes: {
        include: {
          questions: {
            include: {
              answers: {
                include: {
                  nextQuestion: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  return (
    <div>
      <h1>{lesson.title}</h1>

      <p>{lesson.content}</p>

      <h2>Knowledge Check</h2>

      {lesson.quizzes.map((quiz) => (
        <QuizComponent
          key={quiz.id}
          quiz={quiz}
        />
      ))}
    </div>
  );
}