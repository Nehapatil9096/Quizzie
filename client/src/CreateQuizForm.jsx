import React, { useState } from 'react';
import './CreateQuizForm.css';

function CreateQuizForm({ onClose, onCreateQuiz }) {
    const [quizName, setQuizName] = useState("");
    const [quizType, setQuizType] = useState("Q&A");
  
  const handleSubmit = (e) => {
    e.preventDefault();

    onCreateQuiz({
        name: quizName,
        type: quizType,
      });
  

    // Close the modal after handling the submission
    onClose();
  };

  return (
    <div className="create-quiz-form-overlay">
      <div className="create-quiz-form">
        <h2>Create Quiz</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="quizName">Quiz Name</label>
            <input
              type="text"
              id="quizName"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quizType">Quiz Type</label>
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
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Continue</button>
          </div>        </form>
      </div>
    </div>
  );
}

export default CreateQuizForm;