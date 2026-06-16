import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Unauthorized</div>;
  }

  return (
    <main className="p-8">
      <h1>Welcome {session.user?.name}</h1>
      <p>Role: {(session.user as any).role}</p>
    </main>
  );
}