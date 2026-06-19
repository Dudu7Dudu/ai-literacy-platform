import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import LogoutButton from "@/app/components/logoutbutton";
import Navbar from "@/app/components/Navbar";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const modules = await prisma.module.findMany({
    orderBy: {
      orderIndex: "asc",
    },
  });

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-2">
          AI Literacy Platform
        </h1>

        <p className="text-gray-600 mb-8">
          Welcome {session?.user?.email}
        </p>

        {modules.map((module) => (
          <div
            key={module.id}
            className="border rounded-xl p-6 mb-4 shadow-sm hover:shadow-md transition"
          >
            <Link
              href={`/modules/${module.id}`}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {module.title}
            </Link>

            <p className="text-gray-600 mt-2">
              {module.description}
            </p>
          </div>
        ))}

        <div className="mt-8">
          <LogoutButton />
        </div>
      </div>
    </>
  );
}