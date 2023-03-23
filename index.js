// Index.js File

const express = require('express');
const app = express();
const { Quiz } = require('./src/models');
const quizzesCtrl = require('./src/controllers/quizzes');
const choicesCtrl = require('./src/controllers/choices');
const questionsCtrl = require('./src/controllers/questions');
const authCtrl = require('./src/controllers/auth');
const session = require('express-session');

app.use(session({
    saveUninitialized: false,
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 }
}));

// statement needed for css file to work
app.use(express.static(__dirname + '/src'));

app.set('views', __dirname + '/src/views');
app.set('view engine', 'twig');

// Home page
app.get('/', (request, response, next) => { response.render('home/home', { name: "Brandon" }) });

// Controllers for other pages
app.use('/quizzes', quizzesCtrl);
app.use('/choices', choicesCtrl);
app.use('/questions', questionsCtrl);

app.use('/auth', authCtrl);

app.listen(3000);
