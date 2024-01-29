// CreateQuizPopup.js
import React from 'react';

function CreateQuizPopup({ onClose, onCreateQuiz, quizName, setQuizName, quizType, setQuizType }) {
  return (
    <div className="create-quiz-popup-overlay">
      <div className="create-quiz-popup">
        <h2>Create Quiz</h2>
        <form onSubmit={(e) => { e.preventDefault(); onCreateQuiz(); }}>
          <div className="form-group">
            <label htmlFor="quizName">Quiz Name:</label>
            <input
              type="text"
              id="quizName"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quizType">Quiz Type:</label>
            <select
              id="quizType"
              value={quizType}
              onChange={(e) => setQuizType(e.target.value)}
            >
              <option value="Q&A">Q&A</option>
              <option value="POLL">POLL</option>
            </select>
          </div>

          <div className="form-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateQuizPopup;
