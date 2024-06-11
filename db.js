let mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/hotel";

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