const express = require('express')
const app = express()
const PORT =  4001
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session');
const userRouter = require('./Routes/user')
app.set('view engine','ejs')

app.use(session({
    secret: 'secret', // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
  }));

app.use(cors())
app.use(express.static('public')); // Assuming your images are in the 'public' folder
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user',userRouter)

app.get('/unauthorized',(req,res)=>{
  res.render('unauthorized')
})

app.get('/*',(req,res)=>{
  res.redirect('/user/login')
})


app.listen(PORT, ()=>{
    console.log(`Server is listing on port => ${PORT}`)
})