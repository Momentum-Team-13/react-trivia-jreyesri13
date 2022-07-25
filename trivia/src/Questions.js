import { useState, useEffect } from 'react';
import axios from 'axios';

export default function QuizQuestions(props) {
    const { categoryID } = props

    const [questions, setQuestions] = useState([])

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [score, setScore] = useState(0);

    const [showScore, setShowScore] = useState(false);


    useEffect(() => {
        axios
            .get(`https://opentdb.com/api.php?amount=10&category=${categoryID}&type=multiple`)
            .then((res) => {
                console.log(res.data.results)
                setQuestions(res.data.results)
            })
    }, [categoryID])


    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    }

    return (
        <div className='app'>
            {showScore ? (
                <div className='score-section'>
                    You scored {score} out of {questions.length}
                </div>
            ) : (
                <>
                    <div className='question-section'>
                        <div className='question-count'>
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className='question-text'>
                            {<>Question Place</>}
                        </div>
                        {/* <div className='question-text'>{questions[currentQuestion].question}</div> */}
                    </div>
                    {/* <div className='answer-section'>
                        {questions[currentQuestion].answerOptions.map((answerOption) => (
                            <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                        ))}
                    </div> */}
                </>
            )}
        </div>
    )




}