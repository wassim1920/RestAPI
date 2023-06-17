const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(error => res.status(500).json({ error: 'Failed to fetch users' }));
});

// Add a new user
router.post('/', (req, res) => {
  const { name, age } = req.body;
  const user = new User({ name, age });

  user.save()
    .then(savedUser => res.status(201).json(savedUser))
    .catch(error => res.status(400).json({ error: 'Failed to create user' }));
});

// Edit a user
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  User.findByIdAndUpdate(id, { name, age }, { new: true })
    .then(updatedUser => {
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(error => res.status(400).json({ error: 'Failed to update user' }));
});

// Remove a user
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  User.findByIdAndRemove(id)
    .then(deletedUser => {
      if (deletedUser) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(error => res.status(400).json({ error: 'Failed to delete user' }));
});

module.exports = router;
