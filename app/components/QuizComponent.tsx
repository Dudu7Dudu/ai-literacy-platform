"use client";
import { useState } from "react";

type Answer = {
    id: string;
    text: string;
    isCorrect: boolean;
};

type Question = {
    id: string;
    text: string;
    answers: Answer[];
};

type Quiz = {
    id: string;
    title: string;
    questions: Question[];
};



export default function QuizComponent({
    quiz,
}: {
    quiz: Quiz;
}) {
    const [feedback, setFeedback] = useState("");
    const handleAnswerClick = (isCorrect: boolean) => {
        if (isCorrect) {
            setFeedback("✓ Correct!");
        } else {
            setFeedback("✗ Incorrect. Try again.");
        }
    };
    return (
        <div>
            <h3>{quiz.title}</h3>

            {quiz.questions.map((question) => (
                <div key={question.id}>
                    <p>{question.text}</p>

                    {question.answers.map((answer) => (
                        <button
                            key={answer.id}
                            onClick={() => handleAnswerClick(answer.isCorrect)}>
                            {answer.text}
                        </button>
                    ))}
                    {feedback && <p>{feedback}</p>}
                </div>
            ))}
        </div>
    );
}