const express =require("express")
const mongoose = require("mongoose")
const cors = require("cors")
//const UserModel = require('./models/Student')
//const StudentModel = require("./models/Student")
//For User DB
const User = require("./models/User")


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
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      await user.addQuiz(quizName, questions);
      res.json({ message: 'Quiz data saved successfully' });
    } catch (error) {
      console.error('Error saving quiz data:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  //************** */

app.listen(3001, () => {
    console.log("server is running")
})