const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: String,
  age: String,
  location: String
}, {
  timestamps: true
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;