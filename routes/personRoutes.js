const express = require("express");
const router = express.Router();
const Person = require("./../models/person");

// Post route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    // Create a new Person document using the Mongoose Model
    const newPerson = new Person(data);

    // Save the new person to the database using await
    const response = await newPerson.save(); // jb tk save nahi hota to wait karo
    console.log("Person Data Saved to Database");
    res.status(200).json(response);
  } catch (error) {
    console.error("Error saving person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json({ error: "Internal Server Error" });
  }
});

// parameterized GET method on the basis of work
router.get("/:work", async (req, res) => {
  try {
    const workType = req.params.work; // Extract the work type from the URL parameter

    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Work Type" });
    }
  } catch (error) {
    console.error("Error fetching persons:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data updated");
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching persons:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data Deleted");
    res.status(404).json({ message: "Person deleted successfully" });
  } catch (error) {
    console.error("Error deleting person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
