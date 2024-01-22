// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import { AuthProvider } from './context/AuthContext'; // Updated import
import CreateQuizForm from './CreateQuizForm'; // Import the new component
import QuizAnalysis from './QuizAnalysis'; // Import the new component
import Navigation from './Navigation'; // Import the Navigation component

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-quiz" element={<CreateQuizForm />} /> {/* Add this line */}
        <Route path="/analytics" element={<QuizAnalysis />} /> {/* Add this line */}

      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
