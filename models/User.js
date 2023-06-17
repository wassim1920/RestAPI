const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  email: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
