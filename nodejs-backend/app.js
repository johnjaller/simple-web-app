const express = require("express");
const app = express();
const cors=require('cors')
const passport=require('passport')
const jwtStrategy=require('./jwtStrategy')
const localStrategy=require('./localStrategy')
const jwt=require('jsonwebtoken')
require('dotenv').config()
// middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())
app.use(passport.initialize())
passport.use('token',jwtStrategy)
passport.use('signin',localStrategy)
app.use(express.text());
// route
app.get("/hello", (req, res) => {
  res.send("Hello World");
});

app.post("/sortnum", (req, res) => {
  let object;
  if (typeof req.body === "string") {
    object = JSON.parse(req.body);
  } else {
    object = req.body;
  }
  let arr = Object.keys(object)[0];
  res.json(object[arr].sort((a, b) => a - b));
});
app.post("/login",passport.authenticate('signin',{session:false}), (req, res) => {
  console.log(req.user)
  const token = jwt.sign(req.user,process.env.JWT_SECRET||"secret" )
  res.json(token)
});
//port forwarding
const port = 8080;
app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});
