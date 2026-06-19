"use client";

import { useState } from "react";

export default function NewModulePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await fetch("/api/modules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    alert("Module created");
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">
        Create Module
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl shadow-sm p-6"
      >
        <div className="mb-4">
          <label className="block font-medium mb-2">
            Module Title
          </label>

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="
              w-full
              bg-white
              border
              border-gray-300
              rounded-lg
              p-3
              text-black
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            placeholder="AI Fundamentals"
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-2">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={4}
            className="
              w-full
              bg-white
              border
              border-gray-300
              rounded-lg
              p-3
              text-black
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            placeholder="Introduction to artificial intelligence..."
          />
        </div>

        <button
          type="submit"
          className="
            bg-blue-600
            text-white
            px-5
            py-2
            rounded-lg
            hover:bg-blue-700
            transition
          "
        >
          Create Module
        </button>
      </form>
    </div>
  );
}