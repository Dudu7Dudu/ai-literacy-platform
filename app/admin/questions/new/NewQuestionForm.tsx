"use client";

import { useState } from "react";

type Quiz = {
  id: string;
  title: string;
};

export default function NewQuestionForm({
  quizzes,
}: {
  quizzes: Quiz[];
}) {
  const [text, setText] = useState("");
  const [quizId, setQuizId] = useState(
    quizzes[0]?.id ?? ""
  );

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        quizId,
      }),
    });

    alert("Question created");
  };

  return (
    <div>
      <h1>Create Question</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Question Text"
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
        />

        <br />

        <select
          value={quizId}
          onChange={(e) =>
            setQuizId(e.target.value)
          }
        >
          {quizzes.map((quiz) => (
            <option
              key={quiz.id}
              value={quiz.id}
            >
              {quiz.title}
            </option>
          ))}
        </select>

        <br />

        <button type="submit">
          Create Question
        </button>
      </form>
    </div>
  );
}