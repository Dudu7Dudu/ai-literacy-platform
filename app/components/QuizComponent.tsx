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
        <div className="bg-white border rounded-xl shadow-sm p-6">
            <h3 className="text-2xl font-bold mb-6">
                {quiz.title}
            </h3>

            {visibleQuestions.map((question) => (
                <div
                    key={question.id}
                    className="bg-gray-50 border rounded-lg p-5 mb-6"
                >
                    <p className="text-lg font-medium mb-4">
                        {question.text}
                    </p>

                    <div className="space-y-2">
                        {question.answers.map((answer) => (
                            <button
                                key={answer.id}
                                onClick={() =>
                                    handleAnswerClick(
                                        question.id,
                                        answer
                                    )
                                }
                                disabled={answeredQuestions.includes(
                                    question.id
                                )}
                                className="
                                block
                                w-full
                                text-left
                                p-3
                                border
                                rounded-lg
                                bg-white
                                hover:bg-blue-50
                                hover:border-blue-500
                                transition
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                            >
                                {answer.text}
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            {feedback && (
                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                    <p className="font-semibold">
                        {feedback}
                    </p>
                </div>
            )}

            {isFinished && (
                <div className="mt-6 border-t pt-6">
                    <h4 className="text-xl font-bold text-green-600">
                        Scenario Complete
                    </h4>

                    <p className="text-gray-600 mt-2">
                        You have reached the end of this path.
                    </p>

                    <button
                        onClick={restartQuiz}
                        className="
                        mt-4
                        bg-blue-600
                        text-white
                        px-5
                        py-2
                        rounded-lg
                        hover:bg-blue-700
                        transition
                    "
                    >
                        Try Another Path
                    </button>
                </div>
            )}
        </div>
    );
}