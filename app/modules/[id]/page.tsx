import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

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
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">
          {module.title}
        </h1>

        <div className="bg-white border rounded-xl shadow-sm p-6 mb-8">
          <p className="text-lg text-gray-700">
            {module.description}
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          Lessons
        </h2>

        <div className="space-y-4">
          {module.lessons.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/lessons/${lesson.id}`}
              className="
                block
                bg-white
                border
                rounded-xl
                p-5
                shadow-sm
                hover:shadow-md
                hover:border-blue-500
                transition
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Lesson {index + 1}
                  </p>

                  <h3 className="text-xl font-semibold">
                    {lesson.title}
                  </h3>
                </div>

                <span className="text-blue-600 font-medium">
                  Open →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
