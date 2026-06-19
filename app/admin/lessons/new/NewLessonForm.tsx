"use client";

import { useState } from "react";

type Module = {
  id: string;
  title: string;
};

export default function NewLessonForm({
  modules,
}: {
  modules: Module[];
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [moduleId, setModuleId] = useState(
    modules[0]?.id ?? ""
  );

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await fetch("/api/lessons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        moduleId,
      }),
    });

    alert("Lesson created");
  };

  return (
    <div>
      <h1>Create Lesson</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Lesson Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <br />

        <textarea
          placeholder="Lesson Content"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />

        <br />

        <select
          value={moduleId}
          onChange={(e) =>
            setModuleId(e.target.value)
          }
        >
          {modules.map((module) => (
            <option
              key={module.id}
              value={module.id}
            >
              {module.title}
            </option>
          ))}
        </select>

        <br />

        <button type="submit">
          Create Lesson
        </button>
      </form>
    </div>
  );
}