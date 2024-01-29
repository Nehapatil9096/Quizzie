const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizName: { type: String, required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      timer: { type: Number, default: 0 },
      options: [String],
      correctOption: { type: Number, required: true },
    },
  ],
  submissions: [
    {
      //userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      userAnswers: [Number], // Array of user's answers (assuming each answer is an index of the option)
      correctAnswers: Number, // Number of correct answers
      totalQuestions: Number, // Total number of questions
      // Add any other fields you want to track for each submission
    }
  ],
  impressions: { type: Number, default: 0 } // Add impressions field to track the number of times the quiz link was opened

});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = { Quiz };
