import React, { useState } from 'react';
import './CreateQuizForm.css';
import AddQuestionsForm from './AddQuestionsForm'; // Import the new component

function CreateQuizForm({ onClose, onCreateQuiz }) {
  const [quizName, setQuizName] = useState("");
  const [quizType, setQuizType] = useState("Q&A");
  const [numOfQuestions, setNumOfQuestions] = useState(1); // Default to 1 question
  const [questions, setQuestions] = useState(Array(numOfQuestions).fill(""));
  const [showAddQuestionsForm, setShowAddQuestionsForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (quizType === 'Q&A') {
      // Show the form for adding questions
      setShowAddQuestionsForm(true);
    } else {
      // Continue with creating the quiz
      onCreateQuiz({
        name: quizName,
        type: quizType,
        numOfQuestions,
        questions,
      });

      // Close the modal after handling the submission
      onClose();
    }
  };

  return (
    <div className="create-quiz-form-overlay">
      <div className="create-quiz-form">
        <h2>Create Quiz</h2>
        {showAddQuestionsForm ? (
          <AddQuestionsForm
            onClose={() => setShowAddQuestionsForm(false)}
            onSaveQuestions={(newQuestions) => {
              setQuestions(newQuestions);
              onCreateQuiz({
                name: quizName,
                type: quizType,
                numOfQuestions,
                questions: newQuestions,
              });
              onClose();
            }}
          />
        ) : (
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
              <button type="button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit">Continue</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CreateQuizForm;
