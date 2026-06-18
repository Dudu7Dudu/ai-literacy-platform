import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("Module ID from URL:", id);

  const module = await prisma.module.findUnique({
    where: {
      id,
    },
    include: {
      lessons: {
        orderBy: {
          orderIndex: "asc",
        },
      },
    },
  });
  console.log("Module from DB:", module);
  if (!module) {
    return <div>Module not found</div>;
  }

  return (
    <div>
      <h1>{module.title}</h1>

      <p>{module.description}</p>

      {module.lessons.map((lesson) => (
        <div key={lesson.id}>
          <Link href={`/lessons/${lesson.id}`}>
            <h2>{lesson.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}