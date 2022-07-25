import './App.css';
// import QuizEx from "./quizTut";
// import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  // const [resourceType, setResourceType] = useState('20');

  // `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`
  // `https://jsonplaceholder.typicode.com/${resourceType}/10`
  // 20, 21, 22

  // useEffect(() => {
  //   fetch(`https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple`)
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  // },
  //   [resourceType])


  const [quizData, setQuizData] = useState([])

  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple`)
      .then((res) => {
        console.log(res.data.results)
        setQuizData(res.data.results)
      })
  }, [])

  const quizArray = quizData.map((data, index) => {
    return(
      <p>{data.question}</p>
    )

  })


  return (
    <>
      {/* <QuizEx /> */}
      {/* <div>
        <button onClick={() => setResourceType('20')}>Mythology</button>
        <button onClick={() => setResourceType('21')}>Sports</button>
        <button onClick={() => setResourceType('22')}>Geography</button>
      </div>
      <h1>{resourceType}</h1> */}
      {quizArray}
    </>

  );
}

export default App;
