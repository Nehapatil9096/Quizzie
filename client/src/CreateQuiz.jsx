import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUserId } from './redux/userSlice';
import './CreateQuiz.css';
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
  const chandleCancel = () => {
    setStep(3);
    setQuizName('');
    setQuizType('');
    setQuestions([]);
    setTimerEnabled(false);
    setTimerDuration(5);
    setQuizLink('');
    setShowFormOverlay(false); // Close the popup
  };
  

  const handleAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions([
        ...questions,
        {
          questionText: '',
          options: [
            { optionText: '', optionType: 'text', imageUrl: '', deleteButton: false },
            { optionText: '', optionType: 'text', imageUrl: '', deleteButton: false },
            { optionText: '', optionType: 'text', imageUrl: '', deleteButton: false },
            { optionText: '', optionType: 'text', imageUrl: '', deleteButton: false },
          ],
          correctOption: 0,
          timer: { enabled: false, duration: 5 },
        },
      ]);
    }
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
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
  const handleCancel = () => {
    setStep(1);
    setQuizName('');
    setQuizType('');
    setQuestions([]);
    setTimerEnabled(false);
    setTimerDuration(5);
    setQuizLink('');
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
                    <label htmlFor="quizName"></label>
                    <input
                        type="text"
                         id="quizName"
                         placeholder="Quiz Name"
                          value={quizName}
                          onChange={(e) => setQuizName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="group-18">
                  <div className="text-wrapper-17">
                    <label htmlFor="quizType">Quiz Type:</label>
                 </div>
                      <div className="button-wrapper">
                 <button
                         className={`quiz-type-button ${quizType === 'Q&A' ? 'active' : ''}`}
                       onClick={() => setQuizType('Q&A')}
                      >
                       Q&A
                         </button>
                                  <button
                                  className={`quiz-type-button ${quizType === 'Poll' ? 'active' : ''}`}
                               onClick={() => setQuizType('Poll')}
                                           >
                                  Poll
                                     </button>
                                    </div>
                                </div>
                        </div>
             
              <button onClick={handleContinue}>Continue</button>
              <button onClick={chandleCancel}>Cancel</button>

            </div>
          </div>
        </div>
      )}

{step === 2 && (
        <div className="step-2-container">
          <div>
            <h2>Questions</h2>
            {questions.map((question, index) => (
              <div key={index} className="question-container">
                <label htmlFor={`questionText-${index}`} className="question-label">
                  Question {index + 1}:
                </label>
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
                <label htmlFor={`optionType-${index}`}>
                  Option Type:
                </label>
                <select
                  id={`optionType-${index}`}
                  value={question.optionType}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[index].optionType = e.target.value;
                    setQuestions(updatedQuestions);
                  }}
                >
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                  <option value="textAndImage">Both Text & Image</option>
                </select>

                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="option-container">
                    <label htmlFor={`option-${index}-${optionIndex}`}>
                      Option {optionIndex + 1}:
                    </label>
                    {!(question.optionType === 'image' || question.optionType === 'textAndImage') && (
                      <input
                        type="text"
                        id={`option-${index}-${optionIndex}`}
                        value={option.optionText}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].options[optionIndex].optionText = e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                      />
                    )}
                    {(question.optionType === 'image' || question.optionType === 'textAndImage') && (
                      <>
                        <label htmlFor={`imageUrl-${index}-${optionIndex}`}>
                          Image URL:
                        </label>
                        <input
                          type="text"
                          id={`imageUrl-${index}-${optionIndex}`}
                          value={option.imageUrl}
                          onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[index].options[optionIndex].imageUrl = e.target.value;
                            setQuestions(updatedQuestions);
                          }}
                        />
                        <br />
                        {question.optionType === 'textAndImage' && (
                          <label htmlFor={`optionText-${index}-${optionIndex}`}>
                            Option Text:
                          </label>
                        )}
                        {question.optionType === 'textAndImage' && (
                          <input
                            type="text"
                            id={`optionText-${index}-${optionIndex}`}
                            value={option.optionText}
                            onChange={(e) => {
                              const updatedQuestions = [...questions];
                              updatedQuestions[index].options[optionIndex].optionText = e.target.value;
                              setQuestions(updatedQuestions);
                            }}
                          />
                        )}
                      </>
                    )}
                    {optionIndex >= 2 && (
                      <button onClick={() => handleDeleteOption(index, optionIndex)}>
                        Delete Option
                      </button>
                    )}
                  </div>
                ))}

                <label htmlFor={`correctOption-${index}`} className="correct-option-label">
                  Correct Option:
                </label>
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
                <br />
                <label htmlFor={`timerEnabled-${index}`}>
                  Enable Timer:
                </label>
                {!question.pollType && (
                  <input
                    type="checkbox"
                    id={`timerEnabled-${index}`}
                    checked={question.timer.enabled}
                    onChange={(e) => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[index].timer.enabled = e.target.checked;
                      setQuestions(updatedQuestions);
                    }}
                  />
                )}
                {!question.pollType && question.timer.enabled && (
                  <>
                    <label htmlFor={`timerDuration-${index}`}>
                      Timer Duration:
                    </label>
                    <select
                      id={`timerDuration-${index}`}
                      value={question.timer.duration}
                      onChange={(e) => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[index].timer.duration = Number(e.target.value);
                        setQuestions(updatedQuestions);
                      }}
                    >
                      <option value={5}>5 seconds</option>
                      <option value={10}>10 seconds</option>
                    </select>
                  </>
                )}
                <hr />

                <button onClick={() => handleDeleteQuestion(index)}>
                  Delete Question
                </button>
              </div>
            ))}

            <button onClick={handleAddQuestion} disabled={questions.length >= 5}>
              Add Question
            </button>
          </div>

          <div className="button-container">
            <button onClick={handleSaveQuiz}>Save Quiz</button>
            <button onClick={handleCancel}>Cancel</button>

            {quizLink && (
              <div>
                <h2>Congrats! Your Quiz is Published!</h2>
                <p>{quizLink}</p>
                <button onClick={handleCopyLink}>Share</button>
              </div>
            )}
          </div>
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
