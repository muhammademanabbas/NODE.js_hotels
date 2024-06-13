let express  = require('express')  ;
let Person = require("../model/person.js");

// router is object
let router = express.Router();


  // Fetch Data from the database
  router.get("/", async (req, res) => {
    try {
      const persons = await Person.find();
      res.status(200).json({ persons });
      res.send(persons);
    } catch (error) {
      console.log(error.message);
    }
  });

   // Data will store in the database
router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newPerson = new Person(data);
      let response  = await newPerson.save();
      console.log("Your Data Has Been Saved SuccesFully");
      res.status(200).json({ response });
    } catch (error) {
      console.log("Error While Saving Person Data!!");
      res.status(500).json({ error: "Inernal Server Error!!" });
      console.log(error);
    }
  });

  // Fetch Data according to work type by params
  router.get("/:workType", async (req, res) => {
    try {
      const persons = await Person.find({work: req.params.workType});
      res.status(200).json({ persons });
      res.send(persons);
    } catch (error) {
      console.log(error.message);
    }
  });

  // Update Data from database by id
  router.put("/:id", async (req, res) => {
    try {
        const id  = req.params.id;
        const UpdatedValue  = req.body;
        const response  = await Person.findByIdAndUpdate(id, UpdatedValue, {
            new: true,
            runValidators: true,
        }) 

        // if person doesnt exist in database
        if(!response){
            res.status(404).json({error:"Person Not Found"})
        }

        res.status(200).json(response);
        console.log("Data Updation");
        
    } catch (error) {
        res.status(500).json({ error: "Inernal Server Error!!" });
        console.log("Error Occur while updation",error.message);
    }
  });

  // Delete Data from database by id
  router.delete("/:id", async (req, res) => {
    try {
        let DeletedPersonID = req.params.id ;
        let response = await Person.findByIdAndDelete(DeletedPersonID);

        // if person doesnt exist in database
        if(!response){
            res.status(404).json({error:"Person Not Found"})
        }

        console.log("Data Deleted");
        res.status(200).json(response);
        
    } catch (error) {
        res.status(500).json({ error: "Inernal Server Error!!" });
        console.log("Error Occur while Deletion",error.message);
    }
  });

  module.exports = router ;