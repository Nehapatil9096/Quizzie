//index.js
const express =require("express")
const mongoose = require("mongoose")
const path = require('path'); 
const cors = require("cors")
const User = require("./models/User")
const { Quiz } = require("./models/quiz.model"); // Update the path accordingly

const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://admin:uXZ0G61yUBJcEw3U@user.dr2i3ep.mongodb.net/?retryWrites=true&w=majority")

app.post("/login",(req,res) => {
const {email,password} = req.body;
User.findOne({email: email})
.then(user =>{
    if(user){
    if(user.password === password) {
        res.json("Success")
    }else{
        res.json("the password is incorrect")
    }
  }else {
    res.json("No record existed")
  }
})
})
app.post('/register',(req,res) => {
    User.create(req.body)
    .then(user => res.json(user))
    .catch(err=> res.json(err))

})
// New route to handle fetching quiz data
app.get('/quiz/:userId/:quizName', async (req, res) => {
    const { userId, quizName } = req.params;

    try {
        const user = await User.findOne({ email: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const quiz = await Quiz.findOne({ userId: user._id, quizName });
       // Find the quiz by matching userId and quizName
        //const quiz = user.quizzes.find(q => q.quizName === quizName);
        console.log("quizName info:",quizName)
        console.log(" User ID info:",userId)
        console.log("quiz info:",quiz)
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
           
        let currentQuestionIndex = 0; // Initialize the current question index

        // Generate HTML for questions and options dynamically
        const questionsHTML = quiz.questions.map((question, index) => {
            const optionsHTML = question.options.map((option, optionIndex) => `
                <label style="grid-column: ${(optionIndex % 2) + 1};">
                    <input type="radio" name="question${index}" value="${optionIndex}">
                    ${option}
                </label>
            `).join('');
        
            return `
                <div id="question${index}" class="question-container" style="${index === 0 ? '' : 'display: none;'}">
                    <p>Question ${index + 1}/${quiz.questions.length}</p>
                    <p>${question.questionText}</p>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr);">${optionsHTML}</div>
                    <button onclick="nextQuestion(${index})">Next</button>
                </div>
            `;
        }).join('');

        // Construct the HTML response with styles and quiz content
        const styledQuizPage = `
    <html>
        <head>
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

                /* Add more styles as needed */
            </style>
        </head>
        <body>
            ${questionsHTML}
            <script>
                let currentQuestionIndex = 0;

                function nextQuestion(index) {
                    const currentQuestion = document.getElementById("question" + index);
                    currentQuestion.style.display = 'none'; // Hide current question

                    currentQuestionIndex++;

                    if (currentQuestionIndex < ${quiz.questions.length}) {
                        const nextQuestion = document.getElementById("question" + currentQuestionIndex);
                        nextQuestion.style.display = 'block'; // Show next question
                    } else {
                        // Handle end of quiz or submission logic here
                        alert('End of quiz or submission logic');
                    }
                }
            </script>
        </body>
    </html>
`;
        // Send the styled HTML content as the response to the browser
        res.send(styledQuizPage);
        // Return the quiz data to the frontend
       // res.json({ quiz });
    } catch (error) {
        console.error('Error fetching quiz data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../client/dist")));

//*********************** */
// Example endpoint for saving quiz data
app.post('/api/saveQuiz', async (req, res) => {
    console.log(req.body); // Log the received data

    const { userId, quizName, questions } = req.body;
    console.log('userId:', userId);

    try {

        //const user = await User.findOne({ _id: userId });
        const user = await User.findOne({email: userId});

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
} 
    catch (error) {
      console.error('Error saving quiz data:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  //************** */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
