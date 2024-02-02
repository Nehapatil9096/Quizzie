// User.js
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [
    {
      optionText: String,
      optionType: { type: String, enum: ['text', 'image', 'textAndImage'] },
      imageUrl: String, // Only applicable if optionType is 'image' or 'textAndImage'
      deleteButton: Boolean, // Only applicable for the last two options
    }
  ],
  correctOption: Number,
  timer: {
    enabled: Boolean,
    duration: { type: Number, default: 0 }, // In seconds
  },
});

const quizSchema = new mongoose.Schema({
  quizName: String,
  questions: [questionSchema],
  submissions: [
    {
      userAnswers: [Number],
      correctAnswers: Number,
      totalQuestions: Number,
    }
  ],
  // Add any other fields you want to track for each quiz
  impressions: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  quizzes: [quizSchema],
});

userSchema.methods.addQuiz = async function (quizName, questions) {
  const newQuiz = {
    quizName,
    questions,
    submissions: [],
    impressions: 0
  };

  this.quizzes.push(newQuiz);
  await this.save({ suppressWarning: true });
};

userSchema.methods.addSubmission = async function (quizIndex, userAnswers, correctAnswers, totalQuestions) {
  this.quizzes[quizIndex].submissions.push({ userAnswers, correctAnswers, totalQuestions });
  await this.save();
};

const User = mongoose.model('User', userSchema);

// Export the Express router for creating quizzes
router.post('/create-quiz', async (req, res) => {
  try {
    const { userId, quizName, questions } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const newQuiz = {
      quizName,
      questions,
      submissions: [],
      impressions: 0
    };
    user.quizzes.push(newQuiz);
    await user.save({ suppressWarning: true });

    res.json(user.quizzes[user.quizzes.length - 1]); // Return the created quiz
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = { User, router };
