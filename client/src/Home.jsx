// Import necessary dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useSelector } from 'react-redux';
import './home.css'; // Import the CSS file
import CreateQuizForm from './CreateQuizForm';
import './CreateQuiz.jsx';

function Home() {
  const quizCount = useSelector((state) => state.quizCount.count);

  const [isCreateQuizModalVisible, setCreateQuizModalVisibility] = useState(false);
  const [quizLink, setQuizLink] = useState(null); // State to store the quiz link

  const navigate = useNavigate(); // Initialize the useNavigate hook
  
  const toggleCreateQuizModal = () => {
    setCreateQuizModalVisibility(!isCreateQuizModalVisible);
  };
  //For new button
  const [isnewModalVisible, setnewModalVisibility] = useState(false);

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
        <button className="sidebar-button" onClick={togglenewModal}>new</button>
        <button className="sidebar-button" onClick={toggleCreateQuizModal}>Create Quiz</button>
        <a href="#" className="logout-button">Logout</a>
      </div>
      <div className="main-content">
        {/* Your main content goes here */}
        <div className="dashboard-container">
          {/* Display the form/modal when isVisible is true */}
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
          {/* Display the form/modal when isVisible is true */}
          {isnewModalVisible && (
            <CreateQuiz isVisible={isnewModalVisible} onClose={togglenewModal} />
          )}
          {/* Display the following blocks by default */}
          <div className="dashboard-block">
          <h3>Number of Quizzes Created: {quizCount}</h3>
          {/* Add logic to display the actual number */}
        </div>
          <div className="dashboard-block">
            <h3>Number of Questions Created</h3>
            {/* Add logic to display the actual number */}
          </div>
          <div className="dashboard-block">
            <h3>Total Impressions</h3>
            {/* Add logic to display the actual number */}
          </div>
        </div>
        {/* Add more content as needed */}
      </div>
    </div>
  );
}

export default Home;
