const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// now the in person schema have the following fields:
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "manager", "waiter"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
});

//  bcrypt

// pre is the middleware function which will run before the save method of mongoose
PersonSchema.pre("save", async function (next) {

   // its saving a new person data by mongoose model which is not in database 
  const PersonData = this;

  // if password is modified or not
  if(!PersonData.isModified("password")) return next()

  try {
    // generate salt (random string)
    const salt = await bcrypt.genSalt(10);

    // generating hash password
    const hashedPassword = await bcrypt.hash(PersonData.password, salt);

    // assigning hashedpassword
    PersonData.password = hashedPassword;

    next();
  } catch (error) {
    console.log(error.message);
    return next();
  }
});

//  our custom function
PersonSchema.methods.comparePassword = async (credientialPassword) => {
  try {
    const isMatch = await bcrypt.compare(credientialPassword, this.password);
    return isMatch;

    // how bcrypt.compare() method works
    // it takes argument
    // 1st argument =  assume --> password
    // 2nd argument =  assume --> ispassword

    // isPassword -----> find salt
    // password   -----> adding salt in this and make hash password and then match
  } catch (error) {
    console.log("Compare Password", error.message);
  }
};

// Create Person model it create the collection name with the plural of person which is people
const Person = mongoose.model("Person", PersonSchema);
module.exports = Person;
