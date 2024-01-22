// Quiz.js
const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz.model'); // Adjust the path accordingly

// Example: Create a new quiz
router.post('/create', async (req, res) => {
  try {
    const { userId, quizName, questions } = req.body;
    const newQuiz = new Quiz({ userId, quizName, questions });
    const savedQuiz = await newQuiz.save();
    res.json(savedQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more routes for updating, deleting, and fetching quizzes as needed

module.exports = router;
