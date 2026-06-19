"use client";

import { useState } from "react";

type Question = {
  id: string;
  text: string;
};

export default function NewAnswerForm({
  questions,
}: {
  questions: Question[];
}) {
  const [text, setText] = useState("");
  const [questionId, setQuestionId] = useState(
    questions[0]?.id ?? ""
  );
  const [nextQuestionId, setNextQuestionId] =
    useState("");
  const [isCorrect, setIsCorrect] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await fetch("/api/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        questionId,
        isCorrect,
        nextQuestionId:
          nextQuestionId || null,
      }),
    });

    alert("Answer created");
  };

  return (
    <div>
      <h1>Create Answer</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Answer Text"
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
        />

        <br />

        <label>Question</label>

        <select
          value={questionId}
          onChange={(e) =>
            setQuestionId(e.target.value)
          }
        >
          {questions.map((question) => (
            <option
              key={question.id}
              value={question.id}
            >
              {question.text}
            </option>
          ))}
        </select>

        <br />

        <label>Correct Answer</label>

        <input
          type="checkbox"
          checked={isCorrect}
          onChange={(e) =>
            setIsCorrect(e.target.checked)
          }
        />

        <br />

        <label>Next Question</label>

        <select
          value={nextQuestionId}
          onChange={(e) =>
            setNextQuestionId(e.target.value)
          }
        >
          <option value="">
            End Scenario
          </option>

          {questions.map((question) => (
            <option
              key={question.id}
              value={question.id}
            >
              {question.text}
            </option>
          ))}
        </select>

        <br />

        <button type="submit">
          Create Answer
        </button>
      </form>
    </div>
  );
}