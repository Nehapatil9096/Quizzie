// QaQuestionsEntry.js

import React, { useState } from "react";
import "./QaQuestionsEntry.css";

const QaQuestionsEntry = ({ onQaQuestionsSubmit }) => {
  const [numQuestions, setNumQuestions] = useState(1);
  const [qaQuestions, setQaQuestions] = useState([]);

  const handleQaQuestionsSubmit = (e) => {
    e.preventDefault();
    // Pass the entered Q&A questions to the parent component
    onQaQuestionsSubmit(qaQuestions);
    // Clear the input fields
    setQaQuestions([]);
  };

  return (
    <form onSubmit={handleQaQuestionsSubmit}>
      <div className="form-group">
        <label htmlFor="numQuestions" className="form-label">
          <strong>Number of Questions</strong>
        </label>
        <input
          type="number"
          min="1"
          max="5"
          name="numQuestions"
          className="form-input"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
        />
      </div>

      {/* Input field for each Q&A question */}
      {[...Array(Number(numQuestions))].map((_, index) => (
        <div key={index} className="form-group">
          <label htmlFor={`qaQuestion${index + 1}`} className="form-label">
            <strong>Question {index + 1}</strong>
          </label>
          <textarea
            placeholder={`Enter Question ${index + 1}`}
            autoComplete="off"
            name={`qaQuestion${index + 1}`}
            className="form-input"
            value={qaQuestions[index] || ""}
            onChange={(e) => {
              const newQaQuestions = [...qaQuestions];
              newQaQuestions[index] = e.target.value;
              setQaQuestions(newQaQuestions);
            }}
          />
        </div>
      ))}

      <button type="submit" className="signup button">
        Continue to Next Step
      </button>
    </form>
  );
};

export default QaQuestionsEntry;
