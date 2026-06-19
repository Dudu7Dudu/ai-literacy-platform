import { prisma } from "@/lib/prisma";
import NewQuizForm from "./NewQuizForm";

export default async function NewQuizPage() {
  const lessons = await prisma.lesson.findMany({
    orderBy: {
      title: "asc",
    },
  });

  return <NewQuizForm lessons={lessons} />;
}