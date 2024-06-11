let express = require("express");
let db = require("./db");
let bodyParser = require("body-parser");
let PersonRouter  = require('./Routers/personRouter.js');


let app = express();

app.use(bodyParser.json()); 

app.get("/", (req, res) => {
  res.send("Welcome to Hotel Reservation System");
});

let personRouter = require('./Routers/personRouter');
app.use('/person', PersonRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});