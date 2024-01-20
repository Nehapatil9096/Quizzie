import React, { useState, useEffect } from 'react';

function AddQuestionForm({ onClose, onAddQuestion }) {
  const [numOfQuestions, setNumOfQuestions] = useState(1);
  const [questions, setQuestions] = useState(Array(numOfQuestions).fill({ text: '', optionType: 'text', options: Array(4).fill('') }));
  const [timer, setTimer] = useState({ enabled: false, duration: 5 });

  const handleNumOfQuestionsChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumOfQuestions(count);
    setQuestions(Array(count).fill({ text: '', optionType: 'text', options: Array(4).fill('') }));
  };

  const handleQuestionTextChange = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };

  const handleOptionTextChange = (questionIndex, optionIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = text;
    setQuestions(updatedQuestions);
  };

  const handleOptionTypeChange = (index, optionType) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].optionType = optionType;
    setQuestions(updatedQuestions);
  };

  const handleTimerToggle = () => {
    setTimer((prevTimer) => ({ ...prevTimer, enabled: !prevTimer.enabled }));
  };

  const handleTimerDurationChange = (e) => {
    const duration = parseInt(e.target.value, 10);
    setTimer((prevTimer) => ({ ...prevTimer, duration }));
  };

  useEffect(() => {
    // You can perform additional logic when the timer state changes
    console.log('Timer:', timer);
  }, [timer]);

  const handleSubmit = () => {
    // You can perform additional validation before calling onAddQuestion
    onAddQuestion({ questions, timer });
    onClose();
  };

  return (
    <div className="add-question-form">
      <h2>Add Questions</h2>
      <div className="form-group">
        <label htmlFor="numOfQuestions">Number of Questions</label>
        <select id="numOfQuestions" value={numOfQuestions} onChange={handleNumOfQuestionsChange}>
          {[...Array(5).keys()].map((count) => (
            <option key={count + 1} value={count + 1}>
              {count + 1}+
            </option>
          ))}
        </select>
      </div>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="question-group">
          <label htmlFor={`question-${questionIndex + 1}`}>Question {questionIndex + 1}</label>
          <input
            type="text"
            id={`question-${questionIndex + 1}`}
            value={question.text}
            onChange={(e) => handleQuestionTextChange(questionIndex, e.target.value)}
          />
          <div className="option-type-group">
            <span>Option Type:</span>
            <label>
              <input
                type="radio"
                value="text"
                checked={question.optionType === 'text'}
                onChange={() => handleOptionTypeChange(questionIndex, 'text')}
              />
              Text
            </label>
            <label>
              <input
                type="radio"
                value="image"
                checked={question.optionType === 'image'}
                onChange={() => handleOptionTypeChange(questionIndex, 'image')}
              />
              Image URL
            </label>
            <label>
              <input
                type="radio"
                value="textAndImage"
                checked={question.optionType === 'textAndImage'}
                onChange={() => handleOptionTypeChange(questionIndex, 'textAndImage')}
              />
              Text and Image URL
            </label>
          </div>
          {[...Array(4).keys()].map((optionIndex) => (
            <div key={optionIndex} className="option-group">
              <label htmlFor={`option-${questionIndex + 1}-${optionIndex + 1}`}>
                Options {optionIndex + 1}
              </label>
              <input
                type="text"
                id={`option-${questionIndex + 1}-${optionIndex + 1}`}
                value={question.options[optionIndex]}
                onChange={(e) => handleOptionTextChange(questionIndex, optionIndex, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}
      <div className="timer-group">
        <label>Timer:</label>
        <label>
          <input type="checkbox" checked={timer.enabled} onChange={handleTimerToggle} />
          On/Off
        </label>
        {timer.enabled && (
          <div>
            <span>Duration:</span>
            <label>
              <input
                type="radio"
                value={5}
                checked={timer.duration === 5}
                onChange={handleTimerDurationChange}
              />
              5 sec
            </label>
            <label>
              <input
                type="radio"
                value={10}
                checked={timer.duration === 10}
                onChange={handleTimerDurationChange}
              />
              10 sec
            </label>
          </div>
        )}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddQuestionForm;
