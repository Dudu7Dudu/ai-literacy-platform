import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Welcome admin: {session.user.email}</p>
    </div>
  );
}