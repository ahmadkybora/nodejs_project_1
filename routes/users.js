require('./app/Models/Idea');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Idea = mongoose.model('ideas');


router.get('/users/login', (req, res) => {
    res.send('users/login');
});

router.get('/users/register', (req, res) => {
    res.send('users/register');
});

module.exports = router;
