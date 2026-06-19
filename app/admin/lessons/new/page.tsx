import { prisma } from "@/lib/prisma";
import NewLessonForm from "./NewLessonForm";

export default async function NewLessonPage() {
  const modules = await prisma.module.findMany({
    orderBy: {
      orderIndex: "asc",
    },
  });

  return <NewLessonForm modules={modules} />;
}