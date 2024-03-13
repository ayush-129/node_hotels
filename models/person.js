const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Define the person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
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
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// HASHING OF PASSWORD
personSchema.pre("save", async function (next) {
  const person = this;

  // Hash the password only if it has been modified (or its new)
  if (!person.isModified("password")) return next();

  try {
    // salt generation
    const salt = await bcrypt.genSalt(10);

    // hash password
    const hadshedPassword = await bcrypt.hash(person.password, salt);

    //overide the plain password with the hashed one
    person.password = hadshedPassword;

    next();
  } catch (err) {
    return next(err);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // use bcrypt to compare the provided password with the hashed
    const isMatch = await bcrypt.compare(candidatePassword, this.password); // compare works very intilligence
    return isMatch;
  } catch (err) {
    throw err;
  }
};

// Create Person Model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
