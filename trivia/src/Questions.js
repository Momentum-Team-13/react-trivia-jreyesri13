import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function QuizQuestions(props) {
    const { categoryID } = props

    const [questions, setQuestions] = useState([])

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [score, setScore] = useState(0);

    const [showScore, setShowScore] = useState(true);


    useEffect(() => {
        axios
            .get(`https://opentdb.com/api.php?amount=10&category=${categoryID}&type=multiple`)
            .then((res) => {
                // console.log(res.data.results)
                setQuestions(res.data.results)
            })
    }, [categoryID])


    if (questions.length > 0) {
        console.log(questions[0].question)
    }
    console.log(questions[0])


    const decodeHtml = (html) => {
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }


    const answerList = () => {
        let incorrectAnswers = questions[currentQuestion].incorrect_answers
        let correctAnswers = questions[currentQuestion].correct_answer
        let allAnswers = [...incorrectAnswers, correctAnswers]
        // console.log(allAnswers)
        return allAnswers
    }





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

    
    if (questions.length > 0) {
        return (
            <div className='app'>
                <>
                    <div className='question-section'>
                        <div className='question-count'>
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className='question-text'>{decodeHtml(questions[currentQuestion].question)}</div>
                    </div>
                    <div className='answer-section'>
                        {answerList().map((answerOption) => (
                            <button>{decodeHtml(answerOption)}</button>
                        ))}
                    </div>
                </>
            </div>
        )
    }



    // <div className='app' >
    //     {showScore ? (
    //         <div className='score-section'>
    //             You scored {score} out of {questions.length}
    //         </div>
    //     ) : (
    //         <>
    //             <div className='question-section'>
    //                 <div className='question-count'>
    //                     <span>Question {currentQuestion + 1}</span>/{questions.length}
    //                 </div>

    //                 {/* <div className='question-text'>{decodeHtml(questions[currentQuestion].question)}</div> */}
    //                 <div className='question-text'>{<p>Question Place</p>}</div>

    //                 {/* <div className='question-text'>{console.log(questions[currentQuestion].question)}</div> */}
    //             </div>
    //             <div className='answer-section'>
    //                 <button>{<p>Answer Place</p>}</button>
    //             </div>
    //             {/* <div className='answer-section'>
    //                 {questions[currentQuestion].answerOptions.map((answerOption) => (
    //                     <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
    //                 ))}
    //             </div> */}
    //         </>
    //     )
    //     }
    // </div>




}