import React, { useState } from 'react';
import './home.css'; // Import the CSS file
import CreateQuizForm from './CreateQuizForm';

function Home() {
  const [isCreateQuizModalVisible, setCreateQuizModalVisibility] = useState(false);

  const toggleCreateQuizModal = () => {
    setCreateQuizModalVisibility(!isCreateQuizModalVisible);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-title">QUIZZIE</div>
        <a href="#" className="sidebar-button">Dashboard</a>
        <a href="#" className="sidebar-button">Analytics</a>
        <button className="sidebar-button" onClick={toggleCreateQuizModal}>Create Quiz</button>
        <a href="#" className="logout-button">Logout</a>
      </div>
      <div className="main-content">
        {/* Your main content goes here */}
        <div className="dashboard-container">
          {/* Display the form/modal when isVisible is true */}
          {isCreateQuizModalVisible && (
            <CreateQuizForm isVisible={isCreateQuizModalVisible} onClose={toggleCreateQuizModal} />
          )}

          {/* Display the following blocks by default */}
          <div className="dashboard-block">
            <h3>Number of Quizzes Created</h3>
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
