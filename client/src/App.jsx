// App.jsx
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store'; // Import your Redux store
>>>>>>> b7b1f88 (changes till quiz creation and save)
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import CreateQuiz from './CreateQuiz';
import CreateQuizForm from './CreateQuizForm';
import Navigation from './Navigation';
import QuizAnalysis from './QuizAnalysis';

function App() {
  return (
    <Provider store={store}>
<<<<<<< HEAD
      <Router basename="/Quizzie"> {/* Set basename to "/Quizzie" */}
        <div>
          <Navigation />
          <Routes>
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup />} /> {/* Default route */}
            <Route path="/home" element={<Home />} />
            <Route path="/CreateQuiz" element={<CreateQuiz />} />
            <Route path="/create-quiz" element={<CreateQuizForm />} />
            <Route path="/analytics" element={<QuizAnalysis />} />
            <Route path="/quiz/:userId/:quizName" element={<QuizViewer />} />
          </Routes>
        </div>
      </Router>
=======
    <Router>
      <div>
        {/* Use the Navigation component */}
        <Navigation />

        {/* Define your routes */}
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Mark" element={<Mark />} />
          <Route path="/create-quiz" element={<CreateQuizForm />} />
          <Route path="/analytics" element={<QuizAnalysis />} /> {/* Add this line for Analytics */}
        </Routes>
      </div>
    </Router>
>>>>>>> b7b1f88 (changes till quiz creation and save)
    </Provider>
  );
}

function QuizViewer() {
  const { userId, quizName } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/quiz/${userId}/${quizName}`)
      .then(response => response.json())
      .then(data => setQuizData(data.quiz))
      .catch(error => console.error('Error fetching quiz data:', error.message));
  }, [userId, quizName]);

  const handleAnswerChange = (questionIndex, selectedOptionIndex) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = selectedOptionIndex;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = () => {
    console.log('User Answers:', userAnswers);
    // Perform any other desired actions with user answers
  };

  return (
    <div>
      {quizData ? (
        <div>
          <h1>Quiz: {quizData.quizName}</h1>
          <div>
            {quizData.questions.map((question, index) => (
              <div key={index}>
                <p>{index + 1}. {question.questionText}</p>
                <ul>
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={optionIndex}
                        onChange={() => handleAnswerChange(index, optionIndex)}
                        checked={userAnswers[index] === optionIndex}
                      />
                      <label>{option}</label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button onClick={handleSubmitQuiz}>Submit Quiz</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;