// quiz.model.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizName: { type: String, required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      timer: { type: Number, default: 0 },
      options: [String],
    },
  ],
  // other quiz-related fields
});

const Quiz = mongoose.model('Quiz', quizSchema);

export { Quiz };
