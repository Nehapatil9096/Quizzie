const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  quizzes: [
    {
      quizName: String,
      questions: [
        {
          questionText: String,
          options: [String],
          correctOption: Number,
        },
      ],
    },
  ],
});

userSchema.methods.addQuiz = async function (quizName, questions) {
  this.quizzes.push({ quizName, questions });
  await this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
