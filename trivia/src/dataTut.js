import { useState, useEffect } from 'react';
import axios from 'axios';


export default function QuizDataValues() {

    const [quizData, setQuizData] = useState([])

    useEffect(() => {
        axios
            .get(`https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple`)
            .then((res) => {
                console.log(res.data.results)
                setQuizData(res.data.results)
            })
    }, [])

    const questions = quizData.map((data, index) => {
        {
            questionText: 'What is the capital of France?',
		}
    })
}
