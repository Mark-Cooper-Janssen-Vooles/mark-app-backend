const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const Person = require('./models/Person');

const PORT = process.env.PORT || 5000;
const app = express();
//local url:
const DB_URL = "mongodb://localhost:27017/mark-app-DB";

const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true };

// mongoose:
mongoose.connect(process.env.DB_URL, dbConfig, (err) => {
  if(err) {
    console.log("error❌")
    console.log(err);
  } else {
    console.log("connected to db 🏄‍♀️")
  }
});

//middleware: 
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//setup paths: 
app.get("/", async (req, res) => {
  const persons = await Person.find();
  console.log(persons);
  res.send(persons);
});

app.post("/new-person", async (req, res) => {
  const { name, age, location } = req.body
  const newPerson = new Person({
    name,
    age,
    location
  })
  const savedPerson = await newPerson.save()
  res.send(savedPerson);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));