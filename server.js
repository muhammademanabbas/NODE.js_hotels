const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
require('dotenv').config();
const PersonRouter  = require('./Routers/personRouter.js');

const passport = require('./auth.js');


const app = express();

// Midleware Function
const logRequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] , Request Made to this URL${req.originalUrl}`);  
  next();  
}

// Body Parser
app.use(bodyParser.json()); 
app.use(logRequest); 

// Passport Authentication Initialize will run before the request reaches any route handlers
app.use(passport.initialize()); 
const localAuthMiddleware  =  passport.authenticate('local',{session:false})

app.get("/", localAuthMiddleware, (req, res) => {
  res.send("Welcome to Hotel Reservation System!!");
});

// Express Routers
app.use('/person', PersonRouter);

// Server PORT
const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});