let mongoose = require("mongoose");
require('dotenv').config()

// local host url
const mongoURL = process.env.MONGO_DB_URL_LOCAL;

// MongoDB atlas url connection
// const mongoURL = process.env.MONGO_DB_URL
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose.connection is an object that emits events
let db  =  mongoose.connection;

db.on('connected',()=>{
    console.log("MongoDB connected successfully");
});

db.on('error',()=>{
    console.log("MongoDB connection error");
});

db.on('disconnected',()=>{
    console.log("MongoDB disconnected");
});

module.exports = db;