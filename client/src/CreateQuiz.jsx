import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUserId } from './redux/userSlice';
import './createquiz.css';
import { incrementQuizCount } from './redux/quizCountSlice'; // Adjust the path


function CreateQuiz() {
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const [quizLink, setQuizLink] = useState('');
  const [step, setStep] = useState(1);
  const [showFormOverlay, setShowFormOverlay] = useState(false); // New state for form-overlay

  const handleContinue = () => {
    if (quizName.trim() !== '') {
      // Show form-overlay
      setShowFormOverlay(true);

      // Move to Step 2
      setStep(2);
    }
  };

  const handleAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions([
        ...questions,
        { questionText: '', options: ['', '', '', ''], correctOption: 0 },
      ]);
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSaveQuiz = async () => {
    try {
      if (!userId) {
        console.error('Error saving quiz data: User ID is empty');
        return;
      }

      const response = await axios.post('http://localhost:3001/api/saveQuiz', {
        userId,
        quizName,
        questions,
      });

      dispatch(setUserId(userId));

      setQuizLink(response.data.quizLink);
      setShowFormOverlay(true);
      dispatch(incrementQuizCount()); // Dispatch the action to increment quiz count

      /*const popupWindow = window.open(
        response.data.quizLink,
        '_blank',
        'height=600,width=800'
      );

      if (popupWindow) {
        popupWindow.document.write(`
          <html>
            <head>
              <title>Quiz</title>
            </head>
            <body>
              <h1>Your Quiz Link</h1>
              <p>Quiz Link: ${response.data.quizLink}</p>
              <p>Share this link for others to access the quiz!</p>
            </body>
          </html>
        `);
        popupWindow.focus();
      } else {
        console.error('Error opening popup window. Make sure your browser allows popups.');
      }*/
    } catch (error) {
      console.error('Error saving quiz data:', error.message);
    }
  };

  const handleCloseOverlay = () => {
    // Hide form-overlay
    setShowFormOverlay(false);
  };

  
  return (
    <div>
      {step === 1 && (
        <div>
          <h1>Enter Quiz Name</h1>
          <div>
            <label htmlFor="quizName">Quiz Name:</label>
            <input
              type="text"
              id="quizName"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
            />
          </div>
          <button onClick={handleContinue}>Continue</button>
        </div>
      )}

    {step === 2 && (  
    <div>
      <h1>Quiz App</h1>
      <div>
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
        {questions.map((question, index) => (
          <div key={index}>
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
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label htmlFor={`option-${index}-${optionIndex}`}>
                  Option {optionIndex + 1}:
                </label>
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
            <button onClick={() => handleDeleteQuestion(index)}>Delete Question</button>
            <hr />
          </div>
        ))}
        <button onClick={handleAddQuestion} disabled={questions.length >= 5}>
          Add Question
        </button>
      </div>
      <button onClick={handleSaveQuiz}>Save Quiz</button>
      {quizLink && (
        <div>
          <p>Quiz Link: {quizLink}</p>
          <p>Share this link for others to access the quiz!</p>
        </div>
      )}
      </div>
      )}

     {/* Form-overlay */}
     {showFormOverlay && (
        <div className="form-overlay">
          <div className="form-overlay-content">
            <h2>Your Quiz has been Saved!</h2>
            <p>Quiz Link: {quizLink}</p>
            <p>Share this link for others to access the quiz!</p>
            <button onClick={handleCloseOverlay}>Close</button>
          </div>
        </div>
      )}
    

    </div>
  );
}

export default CreateQuiz;
