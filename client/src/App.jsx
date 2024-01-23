// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store'; // Import your Redux store
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Mark from './Mark';
import CreateQuizForm from './CreateQuizForm';
import Navigation from './Navigation'; // Import the Navigation component
import QuizAnalysis from './QuizAnalysis'; // Import the QuizAnalysis component

function App() {
  

  //User Function Ends **************
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
