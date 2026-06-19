import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-lg">
          AI Literacy Platform
        </div>

        <div className="flex items-center gap-8">
          <Link
            href="/dashboard"
            className="hover:text-blue-300 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/admin"
            className="hover:text-blue-300 transition"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}