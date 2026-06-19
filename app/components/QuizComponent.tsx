"use client";

import { useState } from "react";

type Answer = {
    id: string;
    text: string;
    isCorrect: boolean;
    nextQuestionId: string | null;
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
    const [visibleQuestions, setVisibleQuestions] = useState([
        quiz.questions[0],
    ]);
    const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);

    const [isFinished, setIsFinished] = useState(false);

    const restartQuiz = () => {
        setVisibleQuestions([quiz.questions[0]]);
        setAnsweredQuestions([]);
        setFeedback("");
        setIsFinished(false);
    };

    const handleAnswerClick = (
        questionId: string,
        answer: Answer
    ) => {
        setAnsweredQuestions((prev) => [...prev, questionId]);

        if (answer.nextQuestionId) {
            const nextQuestion = quiz.questions.find(
                (q) => q.id === answer.nextQuestionId
            );

            if (nextQuestion) {
                setVisibleQuestions((prev) => [
                    ...prev,
                    nextQuestion,
                ]);
            }
        }

        if (answer.isCorrect) {
            setFeedback("✓ Correct!");
        } else {
            setFeedback("✗ Incorrect. Try again.");
        }

        if (!answer.nextQuestionId) {
            setIsFinished(true);
        }
    };

    return (
        <div>
            <h3>{quiz.title}</h3>

            {visibleQuestions.map((question) => (
                <div
                    key={question.id}
                    style={{
                        marginBottom: "2rem",
                        padding: "1rem",
                        border: "1px solid #ccc",
                    }}
                >
                    <p>{question.text}</p>

                    {question.answers.map((answer) => (
                        <button
                            key={answer.id}
                            onClick={() =>
                                handleAnswerClick(question.id, answer)
                            }
                            disabled={answeredQuestions.includes(
                                question.id
                            )}
                        >
                            {answer.text}
                        </button>
                    ))}
                </div>
            ))}

            {feedback && <p>{feedback}</p>}
            {isFinished && (
                <div>
                    <h4>Scenario Complete</h4>

                    <button onClick={restartQuiz}>
                        Try Another Path
                    </button>
                </div>
            )}
        </div>
    );
}