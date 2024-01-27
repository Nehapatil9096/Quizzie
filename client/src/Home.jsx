import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { incrementQuizCount } from './redux/quizCountSlice';
import './home.css';
import CreateQuizForm from './CreateQuizForm';
import CreateQuiz from './CreateQuiz';

function Home() {
  const quizCount = useSelector((state) => state.quizCount.count);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCreateQuizModalVisible, setCreateQuizModalVisibility] = useState(false);
  const [isnewModalVisible, setnewModalVisibility] = useState(false);
  const [quizStats, setQuizStats] = useState(null);

  const toggleCreateQuizModal = () => {
    setCreateQuizModalVisibility(!isCreateQuizModalVisible);
  };

  const togglenewModal = () => {
    setnewModalVisibility(!isnewModalVisible);
  };

 

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
            <CreateQuizForm isVisible={isCreateQuizModalVisible} onClose={toggleCreateQuizModal} />
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
