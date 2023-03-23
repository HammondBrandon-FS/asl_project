// Questions controller
const express = require('express');
const router = express.Router();
const { Question, Choice } = require('../models');
const { isAuthenticated } = require('../middlewares/auth');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

// Index
router.get('/', isAuthenticated, async (req, res) => {
    const questions = await Question.findAll({
        include: [ Choice ]
    });
    if (req.headers.accept.indexOf('/json') > -1){
        res.json(questions);
    } else {
        res.render('question/index', { questions });
    }
});

// Create - Form
router.get('/new', isAuthenticated, (req, res) => {
    res.render('question/create');
});

// Create
router.post('/', isAuthenticated, async (req, res) => {
    const { name } = req.body;
    const question = await Question.create({ name });
    if (req.headers.accept.indexOf('/json') > -1){
        res.json(question);
    } else {
        res.redirect('/questions/' + question.id);
    }
});

// Show
router.get('/:id', isAuthenticated, async (req, res) => {
    const question = await Question.findByPk(req.params.id);
    if (req.headers.accept.indexOf('/json') > -1){
        res.json(question);
    } else {
        res.render('question/show', { question });
    }
});

// Update - Form
router.get('/:id/edit', isAuthenticated, async (req, res) => {
    const question = await Question.findByPk(req.params.id);
    res.render('question/edit', { question });
});

// Update
router.post('/:id', isAuthenticated, async (req, res) => {
    const { name, quizId } = req.body;
    const { id } = req.params;
    const question = await Question.update({ name, quizId }, {
        where: { id }
    })
    if(req.headers.accept.indexOf('/json') > -1) {
        res.json(question);
    } else {
        res.redirect('/questions/' + id);
    }
});

// Delete
router.get('/:id/delete', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const deleted = await Question.destroy({
        where: { id }
    });
    if(req.headers.accept.indexOf('/json') > -1) {
        res.json({'success': true});
    } else {
        res.redirect('/questions');
    }
});

module.exports = router;