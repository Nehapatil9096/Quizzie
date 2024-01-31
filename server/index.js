const express = require("express");
const mongoose = require("mongoose");
const path = require('path'); 
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authMiddleware');
const config = require('./config');
const { User } = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:uXZ0G61yUBJcEw3U@user.dr2i3ep.mongodb.net/?retryWrites=true&w=majority");

app.use(express.static(path.join(__dirname, "../client/dist")));

app.post('/register', async (req, res) => {
    try {
      const { fullName, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const secretKey = config.jwtSecret;
      const token = jwt.sign({ email: user.email, userId: user._id }, secretKey, { expiresIn: '1h' });

      res.json({ message: 'Success', token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/dashboard', async (req, res) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const secretKey = config.jwtSecret;

      jwt.verify(token, secretKey);
      const decodedToken = jwt.verify(token, secretKey);

      const userEmail = decodedToken.email;
      const user = await User.findOne({ email: userEmail });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const numberOfQuizzes = user.quizzes.length;
      const totalQuestionsInQuizzes = user.quizzes.reduce((total, quiz) => total + quiz.questions.length, 0);
      const totalImpressions = user.quizzes.reduce((total, quiz) => total + quiz.impressions, 0);

      res.json({
        numberOfQuizzes,
        totalQuestionsInQuizzes,
        totalImpressions,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/protected-route', authenticateToken, (req, res) => {
    const { username, userId } = req.user;
    res.json({ message: `Protected route accessed by ${username} (${userId})` });
});
app.get('/trending-quizzes', async (req, res) => {
    try {
        const trendingQuizzes = await User.aggregate([
            { $unwind: '$quizzes' },
            { $match: { 'quizzes.impressions': { $gt: 10 } } },
            {
                $project: {
                    _id: '$quizzes._id',
                    title: '$quizzes.quizName',
                    createdAt: '$quizzes.createdAt',
                    impressions: '$quizzes.impressions',
                    icon: '$quizzes.icon',
                },
            },
            { $sort: { 'quizzes.impressions': -1 } },
        ]);

        res.json(trendingQuizzes);
    } catch (error) {
        console.error('Error fetching trending quizzes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/quiz/:userId/:quizName', async (req, res) => {
    const { userId, quizName } = req.params;

    try {
        const user = await User.findOne({ email: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const quiz = user.quizzes.find(q => q.quizName === quizName);

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        quiz.impressions++;
        await user.save();

        let currentQuestionIndex = 0;

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
                        <button onclick="${isLastQuestion ? 'submitQuiz()' : `nextQuestion(${index})`}" class="${isLastQuestion ? 'submit-button' : 'next-button'}">${isLastQuestion ? 'Submit Quiz' : 'Next'}</button>
                    </div>
                </div>
            `;
        }).join('');

        const styledQuizPage = `
            <html>
                <head>
                    <title>Quiz</title>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            background-color: #f0f0f0;
                            color: #333;
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }

                        h1 {
                            color: #007bff;
                            text-align: center;
                            margin-top: 20px;
                        }

                        .question-container {
                            background-color: #fff;
                            border: 1px solid #ccc;
                            border-radius: 8px;
                            padding: 20px;
                            margin: 20px auto;
                            max-width: 600px;
                            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
                        }

                        .options-container {
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;
                            align-items: center;
                            margin-top: 15px;
                        }

                        .option-button {
                            display: block;
                            padding: 10px;
                            margin: 5px;
                            border: 2px solid #007bff;
                            border-radius: 5px;
                            cursor: pointer;
                            width: 48%;
                            box-sizing: border-box;
                            text-align: center;
                            background-color: #fff;
                            transition: background-color 0.3s ease;
                        }

                        .option-button:hover {
                            background-color: #f5f5f5;
                        }

                        .option-button.selected {
                            background-color: #007bff;
                            color: #fff;
                        }

                        .options-wrapper {
                            width: 100%;
                            text-align: center;
                        }

                        .next-button {
                            margin-top: 15px;
                            padding: 10px;
                            background-color: #007bff;
                            color: #fff;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 16px;
                            transition: background-color 0.3s ease;
                        }

                        .next-button:hover {
                            background-color: #0056b3;
                        }

                        .submit-button {
                            background-color: #007bff;
                            color: #fff;
                        }

                        .submit-button:hover {
                            background-color: #0056b3;
                        }
                    </style>
                </head>
                <body>
                    <h1>Quiz</h1>
                    ${questionsHTML}
                    <div class="question-container" id="submitBtn" style="display:none;">
                        <button class="next-button submit-button" onclick="submitQuiz()">Submit Quiz</button>
                    </div>
                    <script>
                        let currentQuestionIndex = 0;
                        let userScore = 0;

                        function selectOption(questionIndex, optionIndex, correctOptionIndex) {
                            const options = document.querySelectorAll(\`#question\${questionIndex} .option-button\`);
                            options.forEach(option => option.classList.remove('selected'));

                            const selectedOption = document.getElementById(\`option\${questionIndex}_\${optionIndex}\`);
                            selectedOption.classList.add('selected');

                            if (optionIndex === correctOptionIndex) {
                                userScore++;
                            }
                        }

                        function nextQuestion(index) {
                            const currentQuestion = document.getElementById("question" + index);
                            currentQuestion.style.display = 'none';

                            currentQuestionIndex++;

                            if (currentQuestionIndex < ${quiz.questions.length}) {
                                const nextQuestion = document.getElementById("question" + currentQuestionIndex);
                                nextQuestion.style.display = 'block';
                            } else {
                                const submitButton = document.getElementById("submitBtn");
                                submitButton.style.display = 'block';
                            }
                        }

                        function submitQuiz() {
                            const userAnswers = [];
                            const answerInputs = document.querySelectorAll('.answer-input');
                        
                            answerInputs.forEach(input => {
                                userAnswers.push(input.value);
                            });

                            fetch('/submit-quiz/${quiz._id}', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    userId: '${userId}',
                                    answers: userAnswers,
                                }),
                            })
                            .then(response => {
                                if (response.ok) {
                                    alert(\`Your score: \${userScore}/${quiz.questions.length}\`);
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

        res.send(styledQuizPage);
    } catch (error) {
        console.error('Error fetching quiz data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/saveQuiz', async (req, res) => {
    console.log(req.body);

    const { userId, quizName, questions } = req.body;
    console.log('userId:', userId);

    try {
        const user = await User.findOne({ email: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const quizLink = `http://localhost:3001/quiz/${userId}/${quizName}`;
        await user.addQuiz(quizName, questions);

        return res.json({ message: 'Quiz data saved successfully', quizLink });
    } catch (error) {
        console.error('Error saving quiz data:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/submit-quiz/:quizId', async (req, res) => {
    console.log('Manoj quiz ID:', req.params.quizId);
    try {
        const quizId = req.params.quizId;
        const quiz = await User.findOne({ 'quizzes._id': quizId }, { 'quizzes.$': 1 });
        console.log('Neha quiz ID:', quiz);

        if (!quiz || !quiz.quizzes[0]) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        const selectedQuiz = quiz.quizzes[0];

        const { answers } = req.body;

        let correctAnswers = 0;
        selectedQuiz.questions.forEach((question, index) => {
            if (answers[index] === question.correctOption) {
                correctAnswers++;
            }
        });

        await User.updateOne(
            { 'quizzes._id': quizId },
            {
                $push: {
                    'quizzes.$.submissions': {
                        userAnswers: answers,
                        correctAnswers,
                        totalQuestions: selectedQuiz.questions.length,
                    },
                },
            }
        );

        res.json({ message: 'Quiz submitted successfully' });
    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/score', (req, res) => {
    const { score } = req.query;
    res.send(`
        <html>
            <head>
                <title>Quiz Score</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f0f0f0;
                        color: #333;
                        text-align: center;
                        margin: 50px;
                    }
                </style>
            </head>
            <body>
                <h1>Quiz Score</h1>
                <p>Your score: ${score}</p>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});