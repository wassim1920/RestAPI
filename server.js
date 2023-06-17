const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewarenpm
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log('Failed to connect to MongoDB', error));

// Routes
app.use('/api/users', require('./routes/user'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
