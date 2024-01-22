import React, { useState } from 'react';
import './CreateQuizForm.css';
import { useAuth } from './context/AuthContext';
import axios from 'axios';
import AddQuestionsForm from './AddQuestionsForm';

function CreateQuizForm({ onClose, onQuizCreate }) {
  const { userId } = useAuth();
  const [quizName, setQuizName] = useState('');
  const [quizType, setQuizType] = useState('Q&A');
  const [numOfQuestions, setNumOfQuestions] = useState(1);
  const [questions, setQuestions] = useState(Array(numOfQuestions).fill(''));
  const [showAddQuestionsForm, setShowAddQuestionsForm] = useState(false);

  // Call the backend API to save the quiz details (name, type, questions, etc.)
  const saveQuizDetails = async (quizDetails) => {
    try {
      const response = await axios.post('http://localhost:3001/create-quiz', quizDetails);
      console.log('Quiz created successfully:', response.data);
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (quizType === 'Q&A') {
      // Show the form for adding questions
      setShowAddQuestionsForm(true);
    } else {
      // Continue with creating the quiz
      saveQuizDetails({
        userId, // Pass the user ID here
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
              saveQuizDetails({
                userId, // Pass the user ID here
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
