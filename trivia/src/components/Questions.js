import React, { useState, useEffect } from 'react';
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
                // console.log(res.data.results)
                setQuestions(res.data.results)
            })
    }, [categoryID])


    // if (questions.length > 0) {
    //     console.log(questions[0].question)
    // }
    // console.log(questions[0])

    const decodeHtml = (html) => {
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    // Fisher–Yates shuffle 
    const shuffleArray = (arrayZ) => {
        const array = arrayZ.slice()
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }


    const answerArray = () => {
        let incorrectAnswers = questions[currentQuestion].incorrect_answers
        let correctAnswers = questions[currentQuestion].correct_answer
        let allAnswers = [...incorrectAnswers, correctAnswers]
        // console.log(allAnswers)
        let shuffledArray = shuffleArray(allAnswers)
        return shuffledArray
    }


    const handleAnswerOption = (answerOption) => {
        let correctAnswer = questions[currentQuestion].correct_answer

        if (correctAnswer === answerOption) {
            setScore(score + 1)
        }

        const nextQuestion = currentQuestion + 1
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            setShowScore(true)
        }
    }


    if (questions.length > 0) {
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
                            <div className='question-text'>{decodeHtml(questions[currentQuestion].question)}</div>
                        </div>
                        <div className='answer-section'>
                            {answerArray().map((answer) => (
                                <button onClick={() => handleAnswerOption(answer)}>{decodeHtml(answer)}</button>
                            ))}
                        </div>
                    </>

                )}
            </div>
        )
    }
}