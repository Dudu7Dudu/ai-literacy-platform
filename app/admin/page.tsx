import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Panel</h1>

      <div className="grid gap-4">
        <Link
          href="/admin/modules/new"
          className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">
            Create Module
          </h2>

          <p className="text-gray-600">
            Add a new learning module
          </p>
        </Link>

        <Link
          href="/admin/lessons/new"
          className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">
            Create Lesson
          </h2>

          <p className="text-gray-600">
            Add lesson content
          </p>
        </Link>

        <Link
          href="/admin/quizzes/new"
          className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">
            Create Quiz
          </h2>

          <p className="text-gray-600">
            Add assessment content
          </p>
        </Link>

        <Link
          href="/admin/questions/new"
          className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">
            Create Question
          </h2>

          <p className="text-gray-600">
            Add branching scenario questions
          </p>
        </Link>
      </div>
    </div>
  );
}