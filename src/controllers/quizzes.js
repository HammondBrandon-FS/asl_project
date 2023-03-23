// Quizzes controller
const express = require('express');
const router = express.Router();
const { Quiz, Question } = require('../models');
const bodyParser = require('body-parser');
const { isAuthenticated } = require('../middlewares/auth');
router.use(bodyParser.urlencoded({ extended: false }));

// Index
router.get('/', isAuthenticated, async (req, res) => {
    const quizzes = await Quiz.findAll({
        include: [ Question ]
    });
    if(req.headers.accept.indexOf('/json') > -1) {
        res.json(quizzes);
    } else {
        res.render('quiz/index', { quizzes });
    }
});

// Create - Form
router.get('/new', isAuthenticated, (req, res) => {
    res.render('quiz/create');
});

// Create
router.post('/', isAuthenticated, async (req, res) => {
    // const { id, name} = req.body;
    // quizzes.push({
    //     id: Number(id),
    //     name
    // });
    const { name, weight } = req.body;
    if (Number(weight) >= 0 && Number(weight) <= 100){
        const quiz = await Quiz.create({ name, weight });
        if(req.headers.accept.indexOf('/json') > -1) {
            res.json(quiz);
        } else {
            res.redirect('/quizzes/' + quiz.id);
        } 
    } else {
        console.log('Error: weight must be between 0 and 100');
        res.redirect('/quizzes');
    }
});

// Show
router.get('/:id', isAuthenticated, async (req, res) => {
    // const id = req.params.id;
    // const quiz = quizzes.find(q => q.id == id);
    const quiz = await Quiz.findByPk(req.params.id);
    if(req.headers.accept.indexOf('/json') > -1) {
        res.json(quiz);
    } else {
        res.render('quiz/show', { quiz });
    }
});

// Update - Form
router.get('/:id/edit', isAuthenticated, async (req, res) => {
    const quiz = await Quiz.findByPk(req.params.id);
    res.render('quiz/edit', { quiz });
});

// Update
router.post('/:id', isAuthenticated, async (req, res) => {
    // const id = Number(req.params.id);
    // quizzes.map((q) => {
    //     if (id === q.id) {
    //         q.name = req.body.name;
    //     }
    //     return q;
    // })
    const { name, weight } = req.body;
    const { id } = req.params;
    console.log(req.body);
    const quiz = await Quiz.update({ name, weight }, {
        where: { id }
    })
    if(req.headers.accept.indexOf('/json') > -1) {
        res.json(quiz);
    } else {
        res.redirect('/quizzes/' + id);
    }
});

// Delete - changed to get in order to support html form
router.get('/:id/delete', isAuthenticated, async (req, res) => {
    // const id = Number(req.params.id);
    // quizzes = quizzes.filter(q => q.id !== id);
    // res.json(quizzes);
    const { id } = req.params;
    const deleted = await Quiz.destroy({
        where: { id }
    });
    if(req.headers.accept.indexOf('/json') > -1) {
        res.json({'success': true});
    } else {
        res.redirect('/quizzes');
    }
});

module.exports = router;