// QuizViewer.jsx
import React, { useState, useEffect } from 'react';
import './QuizViewer.css'; // Import the CSS file

function QuizViewer() {
    const { userId, quizName } = useParams();
    const [quizData, setQuizData] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);



  useEffect(() => {
    // Fetch quiz data from your server
    fetch(`http://localhost:3001/quiz/${userId}/${quizName}`)
      .then(response => response.json())
      .then(data => setQuizData(data.quiz))
      .catch(error => console.error('Error fetching quiz data:', error.message));
  }, [userId, quizName]);

  const handleAnswerChange = (questionIndex, selectedOptionIndex) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = selectedOptionIndex;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = () => {
    // Calculate the score or perform any other desired action with user answers
    console.log('User Answers:', userAnswers);
  };

  return (
    <div id="quiz-container">
      {quizData ? (
        <>
          <h1 id="quiz-title">Quiz: {quizData.quizName}</h1>
          <div id="questions-container" style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial, sans-serif' }}>
            {quizData.questions.map((question, index) => (
              <div key={index} id="question-container">
                <p id="question-text">{index + 1}. {question.questionText}</p>
                <ul id="options-container">
                  {question.options.map((option, optionIndex) => (
                    <li className="option" key={optionIndex}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={optionIndex}
                        onChange={() => handleAnswerChange(index, optionIndex)}
                        checked={userAnswers[index] === optionIndex}
                      />
                      <label>{option}</label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button id="submit-btn" onClick={handleSubmitQuiz}>Submit Quiz</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default QuizViewer;
