import { prisma } from "@/lib/prisma";
import QuizComponent from "@/app/components/QuizComponent";
import Navbar from "@/app/components/Navbar";

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
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">
          {lesson.title}
        </h1>

        <div className="bg-white rounded-xl border shadow-sm p-6 mb-10">
          <p className="text-lg leading-relaxed">
            {lesson.content}
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          Knowledge Check
        </h2>

        <div className="space-y-6">
          {lesson.quizzes.map((quiz) => (
            <QuizComponent
              key={quiz.id}
              quiz={quiz}
            />
          ))}
        </div>
      </div>
    </>
  );
}