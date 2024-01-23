// src/mark.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Mark() {
  // State to manage quiz information
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);
  const userId = useSelector((state) => state.user.userId);

  // Function to add a new question to the quiz
  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctOption: 0 }]);
  };
  console.log(userId);
  // Function to save the quiz to the server
  const handleSaveQuiz = async () => {
    try {
        if (!userId) {
            console.log(userId);

            console.error('Error saving quiz data: User ID is empty');
            return;
        }

      await axios.post('http://localhost:3001/api/saveQuiz', { userId, quizName, questions });
      console.log('Quiz data saved successfully');
    } catch (error) {
      console.error('Error saving quiz data:', error.message);
    }
  };
  
  // JSX for the main component
  return (
    <div>
      <h1>Quiz App</h1>
      <div>
        {/* Input for quiz name */}
        <label htmlFor="quizName">Quiz Name:</label>
        <input
          type="text"
          id="quizName"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
        />
      </div>
      <div>
        <h2>Questions</h2>
        {/* Mapping over questions array to display question inputs */}
        {questions.map((question, index) => (
          <div key={index}>
            {/* Input for question text */}
            <label htmlFor={`questionText-${index}`}>Question {index + 1}:</label>
            <input
              type="text"
              id={`questionText-${index}`}
              value={question.questionText}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index].questionText = e.target.value;
                setQuestions(updatedQuestions);
              }}
            />
            <br />
            {/* Mapping over options array to display option inputs */}
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                {/* Input for each option */}
                <label htmlFor={`option-${index}-${optionIndex}`}>Option {optionIndex + 1}:</label>
                <input
                  type="text"
                  id={`option-${index}-${optionIndex}`}
                  value={option}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[index].options[optionIndex] = e.target.value;
                    setQuestions(updatedQuestions);
                  }}
                />
              </div>
            ))}
            {/* Dropdown for selecting correct option */}
            <label htmlFor={`correctOption-${index}`}>Correct Option:</label>
            <select
              id={`correctOption-${index}`}
              value={question.correctOption}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index].correctOption = Number(e.target.value);
                setQuestions(updatedQuestions);
              }}
            >
              {question.options.map((_, optionIndex) => (
                <option key={optionIndex} value={optionIndex}>
                  Option {optionIndex + 1}
                </option>
              ))}
            </select>
            <hr />
          </div>
        ))}
        {/* Button to add a new question */}
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>
      {/* Button to save the quiz */}
      <button onClick={handleSaveQuiz}>Save Quiz</button>

    </div>
  );
}

export default Mark;
