//index.js
const express =require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const User = require("./models/User")
const { Quiz } = require("./models/quiz.model"); // Update the path accordingly

const app = express()
app.use(express.json())
app.use(cors())
//mongoose.connect("mongodb+srv://admin:uXZ0G61yUBJcEw3U@user.dr2i3ep.mongodb.net/?retryWrites=true&w=majority")
//for User DB
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
      const quizLink = `/quiz/${userId}/${quizName}-${Date.now()}`;

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

app.listen(3001, () => {
    console.log("server is running")
})