const express = require("express");
const mongoose = require("mongoose");
const path = require('path'); 
const cors = require("cors");
const User = require("./models/User");
const { Quiz } = require("./models/quiz.model"); // Update the path accordingly

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:uXZ0G61yUBJcEw3U@user.dr2i3ep.mongodb.net/?retryWrites=true&w=majority");

app.post("/login", (req, res) => {
const { email, password } = req.body;
User.findOne({ email: email })
.then(user => {
    if (user) {
    if (user.password === password) {
        res.json("Success");
                } else {
        res.json("the password is incorrect");
    }
  } else {
    res.json("No record existed");
  }
});
});

app.post('/register', (req, res) => {
    User.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

// New route to handle fetching quiz data
app.get('/quiz/:userId/:quizName', async (req, res) => {
    const { userId, quizName } = req.params;

    try {
        const user = await User.findOne({ email: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const quiz = await Quiz.findOne({ userId: user._id, quizName });
       
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
           
        let currentQuestionIndex = 0; // Initialize the current question index

        // Generate HTML for questions and options dynamically
        const questionsHTML = quiz.questions.map((question, index) => {
            const optionsHTML = question.options.map((option, optionIndex) => `
                <button onclick="selectOption(${index}, ${optionIndex}, ${question.correctOption})" class="option-button" id="option${index}_${optionIndex}">
                    ${option}
                </button>
            `).join('');
        
            const displayedQuestionNumber = index + 1;
            const isLastQuestion = displayedQuestionNumber === quiz.questions.length;
        
            return `
                <div id="question${index}" class="question-container" style="${index === 0 ? '' : 'display: none;'}">
                    <p>Question ${displayedQuestionNumber}/${quiz.questions.length}</p>
                    <p>${question.questionText}</p>
                    <div class="options-wrapper">
                        <div class="options-container">${optionsHTML}</div>
                        <button onclick="${isLastQuestion ? 'submitQuiz()' : `nextQuestion(${index})`}">${isLastQuestion ? 'Submit' : 'Next'}</button>
                    </div>
                </div>
            `;
        }).join('');

// Construct the HTML response with styles and quiz content
const styledQuizPage = `
    <html>
        <head>
            <title>Quiz</title>
            <style>
                /* Your CSS rules for styling the page go here */
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f0f0f0;
                    color: #333;
                    /* Add more styles as needed */
                }

                h1 {
                    color: #007bff;
                }

                .option-button {
                    display: block;
                    padding: 10px;
                    margin: 5px;
                    border: 1px solid #ccc;
                    cursor: pointer;
                    width: 48%; /* Adjust the width as needed */
                    box-sizing: border-box; /* Include padding and border in width */
                }

                .option-button.selected {
                    border-color: #007bff;
                }

                .options-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: center; /* Center items vertically */
                }

                .options-wrapper {
                    width: 100%; /* Make the wrapper take the full width */
                    text-align: center; /* Center the content horizontally */
                }

                .question-container {
                    margin-bottom: 20px;
                }

                .next-button {
                    margin-top: 10px; /* Adjust margin as needed */
                }
            </style>
        </head>
        <body>
            <h1>Quiz</h1>
            ${questionsHTML}
            <!-- Add a submit button -->
            <button onclick="submitQuiz()">Submit</button>
            <script>
                let currentQuestionIndex = 0;
                let userScore = 0;

                function selectOption(questionIndex, optionIndex, correctOptionIndex) {
                    // Clear selected class from all options in the current question
                    const options = document.querySelectorAll(\`#question\${questionIndex} .option-button\`);
                    options.forEach(option => option.classList.remove('selected'));

                    // Add selected class to the clicked option
                    const selectedOption = document.getElementById(\`option\${questionIndex}_\${optionIndex}\`);
                    selectedOption.classList.add('selected');

                    // Update score if the selected option is correct
                    if (optionIndex === correctOptionIndex) {
                        userScore++;
                    }
                }

                function nextQuestion(index) {
                    const currentQuestion = document.getElementById("question" + index);
                    currentQuestion.style.display = 'none'; // Hide current question

                    currentQuestionIndex++;

                    if (currentQuestionIndex < ${quiz.questions.length}) {
                        const nextQuestion = document.getElementById("question" + currentQuestionIndex);
                        nextQuestion.style.display = 'block'; // Show next question
                    } else {
                        // Handle last question logic (e.g., change button to Submit)
                        const submitButton = document.getElementById("submitBtn");
                        submitButton.style.display = 'block';
                    }
                }

                function submitQuiz() {
                   
                    // Retrieve user's answers
                    const userAnswers = [];

                    // Your logic to retrieve user's answers goes here
                    // This could involve querying the DOM or accessing state variables
                    // Assuming each question has input fields with class "answer-input"
                    const answerInputs = document.querySelectorAll('.answer-input');
                
                    answerInputs.forEach(input => {
                        userAnswers.push(input.value); // Assuming input fields contain user's answers
                    });
                    // Send quiz data to backend for submission
                    fetch('/submit-quiz/${quiz._id}', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: '${userId}', // Include the userId here
                            answers: userAnswers,  
                          }),
                    })
                    .then(response => {
                        if (response.ok) {
                            alert('Quiz submitted successfully');
                        } else {
                            alert('Failed to submit quiz');
                        }
                    })
                    .catch(error => {
                        console.error('Error submitting quiz:', error);
                        alert('Failed to submit quiz');
                    });
                }
            </script>
        </body>
    </html>
`;

// Send the styled HTML content as the response to the browser
res.send(styledQuizPage);
    } catch (error) {
        console.error('Error fetching quiz data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Endpoint to retrieve the total number of quizzes created
app.get('/totalQuizzes', async (req, res) => {
    try {
        const totalQuizzes = await Quiz.countDocuments();
        res.json({ totalQuizzes });
    } catch (error) {
        console.error('Error fetching total quizzes:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../client/dist")));

// Example endpoint for saving quiz data
app.post('/api/saveQuiz', async (req, res) => {
    console.log(req.body); // Log the received data

    const { userId, quizName, questions } = req.body;
    console.log('userId:', userId);

    try {
const user = await User.findOne({ email: userId });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Create a unique quiz link (you can use any method to generate this link)
      const quizLink = `http://localhost:3001/quiz/${userId}/${quizName}`;

     // Save the quiz data along with the quiz link
      await user.addQuiz(quizName, questions, quizLink);

      // Create a new Quiz document in the database (assuming you have a Quiz model)
    const newQuiz = new Quiz({ userId: user._id, quizName, questions, quizLink });
    await newQuiz.save();

    return res.json({ message: 'Quiz data saved successfully', quizLink });
} catch (error) {
      console.error('Error saving quiz data:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  //************** */
// Save quiz data endpoint
app.post('/submit-quiz/:quizId', async (req, res) => {
    console.log ('Manoj quiz ID:', req.params.quizId);
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        console.log ('Neha quiz:', quiz)

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        // Update quiz statistics and save to database
        // Your logic to update quiz statistics based on submitted answers here

        // Extract user's answers from request body
        const { answers } = req.body;

        // Update quiz statistics based on user's answers
        let correctAnswers = 0;
        quiz.questions.forEach((question, index) => {
            if (answers[index] === question.correctOption) {
                correctAnswers++;
            }
        });

        quiz.submissions.push({
            //userId,
            userAnswers: answers, // Fixing the reference to userAnswers
            correctAnswers,
            totalQuestions: quiz.questions.length,
        });

        // Save the updated quiz to the database
        await quiz.save();
        
        res.json({ message: 'Quiz submitted successfully' });
    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});