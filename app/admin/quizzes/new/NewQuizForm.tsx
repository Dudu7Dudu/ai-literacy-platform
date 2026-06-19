"use client";

import { useState } from "react";

type Lesson = {
  id: string;
  title: string;
};

export default function NewQuizForm({
  lessons,
}: {
  lessons: Lesson[];
}) {
  const [title, setTitle] = useState("");
  const [lessonId, setLessonId] = useState(
    lessons[0]?.id ?? ""
  );

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await fetch("/api/quizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        lessonId,
      }),
    });

    alert("Quiz created");
  };

  return (
    <div>
      <h1>Create Quiz</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Quiz Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <br />

        <select
          value={lessonId}
          onChange={(e) =>
            setLessonId(e.target.value)
          }
        >
          {lessons.map((lesson) => (
            <option
              key={lesson.id}
              value={lesson.id}
            >
              {lesson.title}
            </option>
          ))}
        </select>

        <br />

        <button type="submit">
          Create Quiz
        </button>
      </form>
    </div>
  );
}