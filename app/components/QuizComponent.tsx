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
    const [currentQuestion, setCurrentQuestion] = useState(
        quiz.questions[0]
    );
    const handleAnswerClick = (answer: Answer) => {
        if (answer.nextQuestionId) {
            const nextQuestion = quiz.questions.find(
                (q) => q.id === answer.nextQuestionId
            );

            if (nextQuestion) {
                setCurrentQuestion(nextQuestion);
                setFeedback("");
                return;
            }
        }

        if (answer.isCorrect) {
            setFeedback("✓ Correct!");
        } else {
            setFeedback("✗ Incorrect. Try again.");
        }
    };
    console.log(
        JSON.stringify(quiz.questions, null, 2)
    );
    return (
        <div>
            <h3>{quiz.title}</h3>

            <div>
                <p>{currentQuestion.text}</p>

                {currentQuestion.answers.map((answer) => (
                    <button
                        key={answer.id}
                        onClick={() => handleAnswerClick(answer)}
                    >
                        {answer.text}
                    </button>
                ))}

                {feedback && <p>{feedback}</p>}
            </div>
        </div>
    );
}