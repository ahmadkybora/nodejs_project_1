require('./app/Models/Idea');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Idea = mongoose.model('ideas');

router.get('/', (req, res) => {
    Idea.find({})
        .sort({date: 'desc'})
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            });
        });
});

router.get('/add', (req, res) => {
    res.render('ideas/add');
});

router.get('/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
        .then(idea => {
            res.render('ideas/edit', {
                idea: idea
            });
        });
});

router.post('/ideas', (req, res) => {
    let errors = [];
    if (!req.body.title) {
        errors.push({text: 'please add a title'})
    }
    if (!req.body.details) {
        errors.push({text: 'please add a details'})
    }
    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details,
        });
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details,

        };
        new Idea(newUser)
            .save()
            .then(idea => {
                res.redirect('/ideas');
            })
            .catch()
    }
});

router.put('/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
        .then()
});

router.delete('/:id', (req, res) => {
    Idea.remove({_id: req.params.id})
        .then(() => {
            res.redirect('/ideas')
        })
});

module.exports = router;
