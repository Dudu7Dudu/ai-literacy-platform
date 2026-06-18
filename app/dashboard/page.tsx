import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import LogoutButton from "@/app/components/logoutbutton";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const modules = await prisma.module.findMany({
    orderBy: {
      orderIndex: "asc",
    },
  });

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Welcome {session?.user?.email}</p>

      {modules.map((module) => (
        <div key={module.id}>
          <p>{module.description}</p>
          <Link href={`/modules/${module.id}`}>
            {module.title}
          </Link>
        </div>
      ))}
      <LogoutButton />
    </div>
  );
}