import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUserId } from './redux/userSlice';
import './CeateQuiz.css';
import { incrementQuizCount } from './redux/quizCountSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateQuiz() {
  const [quizName, setQuizName] = useState('');
  const [quizType, setQuizType] = useState('');
  const [questions, setQuestions] = useState([]);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerDuration, setTimerDuration] = useState(5); // Default timer duration
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const [quizLink, setQuizLink] = useState('');
  const [step, setStep] = useState(1);
  const [showFormOverlay, setShowFormOverlay] = useState(false); 

  const handleContinue = () => {
    if (quizName.trim() !== '' && quizType.trim() !== '') {
      setStep(2);
    }
  };

  const openStepTwoPopup = () => {
    console.log('Popup opened for step 2');
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
        quizType,
        questions,
        timerEnabled,
        timerDuration,
      });

      setQuizLink(response.data.quizLink);
      setShowFormOverlay(true);
      dispatch(incrementQuizCount());
    } catch (error) {
      console.error('Error saving quiz data:', error.message);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(quizLink);
    toast.success('Link Copied To Clipboard');
  };

  const handleCloseOverlay = () => {
    setShowFormOverlay(false);
  };

  return (
    <div>
      <ToastContainer />
      {step === 1 && (
        <div className="create-quiz">
          <div className="div">
            <div className="rectangle-6">
              <div className="group-17">
                <div className="overlap-4">
                  <div className="text-wrapper-16">
                    <label htmlFor="quizName">Quiz Name:</label>
                    <input
                      type="text"
                      id="quizName"
                      value={quizName}
                      onChange={(e) => setQuizName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="group-18">
                  <div className="overlap-5">
                    <div className="text-wrapper-17">
                      <label htmlFor="quizType">Quiz Type:</label>
                      <select
                        id="quizType"
                        value={quizType}
                        onChange={(e) => setQuizType(e.target.value)}
                      >
                        <option value="">Select Quiz Type</option>
                        <option value="Q&A">Q&A</option>
                        <option value="Poll">Poll</option>
                      </select>
                    </div>
                  </div>
                  <div className="q-a-wrapper">
                    <div className="q-a">Q&A</div>
                  </div>
                  <div className="text-wrapper-18">Quiz Type</div>
                </div>
              </div>
              <label htmlFor="timerEnabled">Timer:</label>
              <input
                type="checkbox"
                id="timerEnabled"
                checked={timerEnabled}
                onChange={() => setTimerEnabled(!timerEnabled)}
              />
              <label htmlFor="timerEnabled">On/Off</label>
              {timerEnabled && (
                <div>
                  <label htmlFor="timerDuration">Timer Duration:</label>
                  <select
                    id="timerDuration"
                    value={timerDuration}
                    onChange={(e) => setTimerDuration(parseInt(e.target.value))}
                  >
                    <option value="5">5 sec</option>
                    <option value="10">10 sec</option>
                  </select>
                </div>
              )}
              <button onClick={handleContinue}>Continue</button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          
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
              <h2>Congrats! Your Quiz is Published!</h2>
     
              <p>{quizLink}</p>
              <button onClick={handleCopyLink}>Share</button>
            </div>
          )}
        </div>
      )}

      {showFormOverlay && (
        <div className="form-overlay">
          <div className="form-overlay-content">
            <p>Share this link for others to access the quiz!</p>
            <button onClick={handleCloseOverlay}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateQuiz;