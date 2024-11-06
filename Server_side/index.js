const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')
const app = express()
app.use(express.json())
app.use(cors())
// Set Content Security Policy headers
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 
    "default-src 'none'; script-src 'self' https://vercel.live; font-src 'self' https://nike-api-five.vercel.app; style-src 'self' 'unsafe-inline'; img-src 'self' data:"
  );
  next(); // Continue to the next middleware or route handler
});

mongoose.connect(`mongodb://127.0.0.1:27017/Nike`)

app.get('/', (req, res) => {
  res.send('Hello from the home route');
});

app.post('/sign-up',(req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json({err}))
})

app.post('/login',(req, res) => {
    try{
        const {email,password} = req.body
        UserModel.findOne({email:email})
        .then(users => {
            if(users){
                if(users.password === password){
                    res.json({message: "success"})
                    }else{
                    res.json({message: "Incorrect password"})
                }
            }else{
                res.json({msg: 'User not found'})
            }
        }) 
    } catch(err) {
        res.json({err})
    }
    
})

module.exports = app;
