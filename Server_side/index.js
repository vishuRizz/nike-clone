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
    "default-src 'self'; script-src 'self'; font-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
  );
  next();
});


mongoose.connect(`mongodb+srv://vishurizz01:RzfgxKDYAOSSooKq@cluster0.7ozbuch.mongodb.net/nike`)

app.get('/', (req, res) => {
  res.send('ahh request cuming aahhhh!!');
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

// module.exports = app;
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
