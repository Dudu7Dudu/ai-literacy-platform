import { prisma } from "@/lib/prisma";
import NewQuestionForm from "./NewQuestionForm";

export default async function NewQuestionPage() {
  const quizzes = await prisma.quiz.findMany({
    orderBy: {
      title: "asc",
    },
  });

  return <NewQuestionForm quizzes={quizzes} />;
}