import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './home.css';
import CreateQuizForm from './CreateQuizForm';
import CreateQuiz from './CreateQuiz';
import QuizAnalysis from './QuizAnalysis';


function Home() {
  const dashboardData = useSelector((state) => state.user.dashboardData);

  const userId = useSelector((state) => state.user.userId);

  const [isCreateQuizModalVisible, setCreateQuizModalVisibility] = useState(false);
  const [isnewModalVisible, setnewModalVisibility] = useState(false);
  const [isAnalysisVisible, setAnalysisVisibility] = useState(false); // State for analysis visibility
  const [isDashboardVisible, setDashboardVisibility] = useState(true); // State for dashboard visibility
  const [quizData, setQuizData] = useState([]); // State to store quiz data

  const toggleCreateQuizModal = () => {
    setCreateQuizModalVisibility(!isCreateQuizModalVisible);
  };

  const togglenewModal = () => {
    setnewModalVisibility(!isnewModalVisible);
  };
  
  const toggleAnalysis = () => {
    setAnalysisVisibility(!isAnalysisVisible); // Toggle the visibility state
  };

 

  return (
    <div className="container">
      <div className="sidebar">  
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
          <div className="group-9">
            <div className="text-wrapper-10">Trending Quizs</div>
            <div className="group-10">
              <div className="group-11">
                <div className="text-wrapper-11">Quiz 1</div>
                <p className="p">Created on : 04 Sep, 2023</p>
                <div className="group-12">
                  <div className="text-wrapper-12">667</div>
                  <img className="icon-park-outline" alt="Icon park outline" src="icon-park-outline-eyes-2.svg" />
                </div>
              </div>
            </div>
            <div className="group-13">
              <div className="group-11">
                <div className="text-wrapper-11">Quiz 1</div>
                <p className="p">Created on : 04 Sep, 2023</p>
                <div className="group-12">
                  <div className="text-wrapper-12">667</div>
                  <img className="icon-park-outline" alt="Icon park outline" src="icon-park-outline-eyes-6.svg" />
                </div>
              </div>
            </div>
            <div className="group-14">
              <div className="group-11">
                <div className="text-wrapper-11">Quiz 1</div>
                <p className="p">Created on : 04 Sep, 2023</p>
                <div className="group-12">
                  <div className="text-wrapper-12">667</div>
                  <img className="icon-park-outline" alt="Icon park outline" src="icon-park-outline-eyes-10.svg" />
                </div>
              </div>
            </div>
            <div className="group-15">
              <div className="group-11">
                <div className="text-wrapper-11">Quiz 1</div>
                <p className="p">Created on : 04 Sep, 2023</p>
                <div className="group-12">
                  <div className="text-wrapper-12">667</div>
                  <img className="icon-park-outline" alt="Icon park outline" src="icon-park-outline-eyes-3.svg" />
                </div>
              </div>
            </div>
            <div className="group-16">
              <div className="group-11">
                <div className="text-wrapper-11">Quiz 1</div>
                <p className="p">Created on : 04 Sep, 2023</p>
                <div className="group-12">
                  <div className="text-wrapper-12">667</div>
                  <img className="icon-park-outline" alt="Icon park outline" src="icon-park-outline-eyes-7.svg" />
                </div>
              </div>
            </div>
            <div className="group-17">
              <div className="group-11">
                <div className="text-wrapper-11">Quiz 1</div>
                <p className="p">Created on : 04 Sep, 2023</p>
                <div className="group-12">
                  <div className="text-wrapper-12">667</div>
                  <img className="icon-park-outline" alt="Icon park outline" src="icon-park-outline-eyes-11.svg" />
                </div>
              </div>
            </div>
            <div className="group-18">
              <div className="group-11">
                <div className="text-wrapper-11">Quiz 1</div>
                <p className="p">Created on : 04 Sep, 2023</p>
                <div className="group-12">
                  <div className="text-wrapper-12">667</div>
                  <img className="icon-park-outline" alt="Icon park outline" src="icon-park-outline-eyes-4.svg" />
                </div>
              </div>
            </div>
            <div className="group-19">
              <div className="group-11">
                <div className="text-wrapper-11">Quiz 1</div>
                <p className="p">Created on : 04 Sep, 2023</p>
                <div className="group-12">
                  <div className="text-wrapper-12">667</div>
                  <img className="icon-park-outline" alt="Icon park outline" src="icon-park-outline-eyes-8.svg" />
                </div>
              </div>
            </div>
            <div className="group-20">
              <div className="group-11">
                <div className="text-wrapper-11">Quiz 1</div>
                <p className="p">Created on : 04 Sep, 2023</p>
                <div className="group-12">
                  <div className="text-wrapper-12">667</div>
                  <img className="icon-park-outline" alt="Icon park outline" src="icon-park-outline-eyes.svg" />
                </div>
              </div>
            </div>
            <div className="group-21">
              <div className="group-11">
                <div className="text-wrapper-11">Quiz 1</div>
                <p className="p">Created on : 04 Sep, 2023</p>
                <div className="group-12">
                  <div className="text-wrapper-12">667</div>
                  <img className="icon-park-outline" alt="Icon park outline" src="icon-park-outline-eyes-5.svg" />
                </div>
              </div>
            </div>
            <div className="group-22">
              <div className="group-11">
                <div className="text-wrapper-11">Quiz 1</div>
                <p className="p">Created on : 04 Sep, 2023</p>
                <div className="group-12">
                  <div className="text-wrapper-12">667</div>
                  <img className="icon-park-outline" alt="Icon park outline" src="icon-park-outline-eyes-9.svg" />
                </div>
              </div>
            </div>
            <div className="group-23">
              <div className="group-11">
                <div className="text-wrapper-11">Quiz 1</div>
                <p className="p">Created on : 04 Sep, 2023</p>
                <div className="group-12">
                  <div className="text-wrapper-12">667</div>
                  <img className="icon-park-outline" alt="Icon park outline" src="image.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rectangle" />
        <div className="overlap-2">
          <img className="vector" alt="Vector" src="vector-1.svg" />
          <div className="text-wrapper-13">QUIZZIE</div>
          <div className="logout-wrapper">
            <div className="logout">LOGOUT</div>
          </div>
          <div className="group-24">
            <div className="group-25">
              <div className="overlap-group-4">
                <div className="rectangle-2" />
                <div className="frame">
                  <div className="text-wrapper-14">Dashboard</div>
                  <div className="text-wrapper-15"><button href="#"  onClick={toggleAnalysis}>
          {isAnalysisVisible ? 'Hide Analysis' : 'Show Analysis'} {/* Toggle button text */}
        </button></div>
                  <div className="text-wrapper-15">  <button  onClick={togglenewModal}>New</button></div>
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
