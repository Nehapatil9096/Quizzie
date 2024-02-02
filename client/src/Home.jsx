import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Home.css';
import CreateQuiz from './CreateQuiz';
import QuizAnalysis from './QuizAnalysis';
import axios from 'axios';


function Home() {
  const [dashboardData, setDashboardData] = useState({
    numberOfQuizzes: 0,
    totalQuestionsInQuizzes: 0,
    totalImpressions: 0,
  });
  //const dashboardData = useSelector((state) => state.user.dashboardData);
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userId);

  const [isCreateQuizModalVisible, setCreateQuizModalVisibility] = useState(false);
  const [isnewModalVisible, setnewModalVisibility] = useState(false);
  const [isAnalysisVisible, setAnalysisVisibility] = useState(false); // State for analysis visibility
  const [isDashboardVisible, setDashboardVisibility] = useState(true); // State for dashboard visibility
  const [quizData, setQuizData] = useState([]); // State to store quiz data

  const toggleCreateQuizModal = () => {
    setCreateQuizModalVisibility(!isCreateQuizModalVisible);
    
  };
  const [trendingQuizzes, setTrendingQuizzes] = useState([]);

  const togglenewModal = () => {
    setnewModalVisibility(!isnewModalVisible);
  };
  
  const toggleAnalysis = () => {
    setAnalysisVisibility(!isAnalysisVisible); // Toggle the visibility state
  };
  useEffect(() => {
    const fetchTrendingQuizzes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/trending-quizzes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTrendingQuizzes(response.data);
        } catch (error) {
            console.error('Error fetching trending quizzes:', error);
        }
    };

    fetchTrendingQuizzes();
}, [token, userId]);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!token) {
          console.log('TOKEN IS MISSING, TOKEN',token);
              return;}
        const response = await axios.get('http://localhost:3001/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [token]);

  return (
    <div className="container">
      
      <div className="main-content">
        <div className="dashboard-container">
          {isCreateQuizModalVisible && (
            <CreateQuizForm isVisible={isCreateQuizModalVisible} onClose={toggleCreateQuizModal} />
          )}
          {isnewModalVisible && (
            <CreateQuiz isVisible={isnewModalVisible} onClose={togglenewModal} />
          )}
          {isAnalysisVisible && <QuizAnalysis />} {/* Render QuizAnalysis component if visible */}
           
           {isDashboardVisible && (
            <div className="dashboard">
              {/* Your dashboard content here */}
            </div>
          )}

          <div className="dashboard">
      <div className="div">
        <div className="overlap">
          <div className="group">
            <div className="group-2">
              <div className="overlap-group">
                <div className="div-2" />
                <div className="overlap-group-wrapper">
                  <div className="overlap-group-2">
                    <div className="group-3">
                      <div className="text-wrapper">{dashboardData.totalImpressions}</div>
                      <div className="text-wrapper-2">Total</div>
                    </div>
                    <div className="text-wrapper-3">Impressions</div>
                  </div>
                </div>
              </div>
              <div className="div-2">
                <div className="group-wrapper">
                  <div className="group-4">
                    <div className="group-5">
                      <div className="text-wrapper-4">{dashboardData.numberOfQuizzes}</div>
                      <div className="text-wrapper-5">Quiz</div>
                    </div>
                    <div className="text-wrapper-6">Created</div>
                  </div>
                </div>
              </div>
              <div className="div-wrapper">
                <div className="group-6">
                  <div className="group-7">
                    <div className="overlap-group-3">
                      <div className="group-8">
                        <div className="text-wrapper-7">{dashboardData.totalQuestionsInQuizzes}</div>
                        <div className="text-wrapper-8">questions</div>
                      </div>
                      <div className="text-wrapper-9">Created</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isDashboardVisible && (
    <div className="dashboard">
        <div className="group-9">
            <div className="text-wrapper-10">Trending Quizzes</div>
            {trendingQuizzes.map((quiz) => (
                <div key={quiz._id} className="group-10">
                    <div className="group-11">
                        <div className="text-wrapper-11">{quiz.title}</div>
                        <p className="p">Created on: {quiz.createdAt}</p>
                        <div className="group-12">
                            <div className="text-wrapper-12">{quiz.impressions}</div>
                            <img className="icon-park-outline" alt="Icon park outline" src={quiz.icon} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)}
        </div>
        <div className="rectangle" />
        <div className="overlap-2">
          <img className="vector" alt="Vector" src="vector-1.svg" />
          <div className="text-wrapper-13">QUIZZIE</div>
          <div class="logout-wrapper">
            <a href="/register" class="logout">LOGOUT</a>
          </div>
          <div className="group-24">
            <div className="group-25">
              <div className="overlap-group-4">
                <div className="rectangle-2" />
                <div className="frame">
                  <div className="text-wrapper-15"><button>Dashboard</button></div>
                  <div className="text-wrapper-15"><button href="#"  onClick={toggleAnalysis}>
          {isAnalysisVisible ? 'Hide Analysis' : 'Show Analysis'} {/* Toggle button text */}
        </button></div>
                  <div className="text-wrapper-15">  <button  onClick={togglenewModal}>Create Quiz</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
        </div>
      </div>
    </div>
  );
}


export default Home;
