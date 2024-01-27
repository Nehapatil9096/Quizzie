import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useSelector } from 'react-redux';
import './home.css'; // Import the CSS file
import CreateQuizForm from './CreateQuizForm';
import './CreateQuiz.jsx';

function Home() {
  const quizCount = useSelector((state) => state.quizCount.count);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCreateQuizModalVisible, setCreateQuizModalVisibility] = useState(false);

  const navigate = useNavigate(); // Initialize the useNavigate hook
  
  const toggleCreateQuizModal = () => {
    setCreateQuizModalVisibility(!isCreateQuizModalVisible);
  };

  const togglenewModal = () => {
    setnewModalVisibility(!isnewModalVisible);
  };
  


  // Function to handle quiz creation
  const handleCreateQuiz = async (quizDetails) => {
    try {
      // Make an API call to create the quiz
      const response = await axios.post('http://localhost:3001/createQuiz', quizDetails);

      // Handle the response
      console.log("Quiz creation response:", response.data);

      // Update the state with the quiz link
      setQuizLink(response.data.quizLink);
    } catch (error) {
      console.error("Error creating quiz:", error);
      // Handle error as needed
    }
  };

  // Function to handle quiz creation
 

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-title">QUIZZIE</div>

        <a href="#" className="sidebar-button">Dashboard</a>
        <button href="#" className="sidebar-button">Analytics</button>
        <button className="sidebar-button" onClick={togglenewModal}>New</button>
        <button className="sidebar-button" onClick={toggleCreateQuizModal}>Create Quiz</button>
        <a href="#" className="logout-button">Logout</a>
      </div>
      <div className="main-content">
        <div className="dashboard-container">
          {isCreateQuizModalVisible && (
            <CreateQuizForm
              isVisible={isCreateQuizModalVisible}
              onClose={() => {
                setCreateQuizModalVisibility(false);
                // Reset the quiz link when the modal is closed
                setQuizLink(null);
              }}
              onCreateQuiz={handleCreateQuiz} // Pass the function to handle quiz creation
            />
          )}

          {/* Display the quiz link if available */}
          {quizLink && (
            <div className="dashboard-block">
              <h3>Quiz Link</h3>
              <p>{quizLink}</p>
            </div>
          )}
          {isnewModalVisible && (
            <CreateQuiz isVisible={isnewModalVisible} onClose={togglenewModal} />
          )}
          <div className="dashboard-block">
            <h3>Number of Quizzes Created: {quizCount}</h3>
          </div>
          <div className="dashboard-block">
            <h3>Number of Questions Created</h3>
            {/* Add logic to display the actual number */}
          </div>
          <div className="dashboard-block">
            <h3>Total Impressions: {quizStats?.impressions}</h3>
          </div>
          <div className="dashboard-block">
            <h3>Attempted Questions: {quizStats?.attemptedQuestions}</h3>
            <h3>Correct Questions: {quizStats?.correctQuestions}</h3>
            <h3>Incorrect Questions: {quizStats?.incorrectQuestions}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
