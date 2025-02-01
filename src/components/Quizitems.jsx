import { useState } from "react"
import '../styles/Quizitems.css';



export const Quizitems = ({question, AnswerSelect}) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswerSelect = (option) =>{
        setSelectedAnswer(option);
        AnswerSelect(question.id, option);
    };

    const isCorrect = selectedAnswer === question.answer;

    console.log('in quizitem');

    return (
        <div className="quiz-items">
            <h3>{question.question} </h3>
            <div className="options">
                {question.options.map((op) => {
                    return (
                        <div key={op} >
                            <button onClick={() => handleAnswerSelect(op)} className={`option ${selectedAnswer === op ? isCorrect ? 'correct' : 'incorrect' : ''}`} disabled= {selectedAnswer !== null}>{op} </button>
                        </div>
                    )
                })}
            </div>

            <button className="show-answer" onClick={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
            {showAnswer && selectedAnswer && (
                <p className={`ans-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? `Correct! The Answer is ${question.answer}` : `Incorrect! The Correct Answer is ${question.answer}`}
                </p>
            )}
        </div>
    );

};