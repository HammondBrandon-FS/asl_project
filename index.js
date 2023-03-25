// Index.js File

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Quiz } = require('./src/models');
const quizzesCtrl = require('./src/controllers/quizzes');
const choicesCtrl = require('./src/controllers/choices');
const questionsCtrl = require('./src/controllers/questions');
const authCtrl = require('./src/controllers/auth');
const cors = require('cors');
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
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true,
    "allowCrossDomain": true
}))

app.use(bodyParser.urlencoded({ extended:false }))

// Home page
app.get('/', (request, response, next) => { response.render('home/home') });

// Controllers for other pages
app.use('/quizzes', quizzesCtrl);
app.use('/choices', choicesCtrl);
app.use('/questions', questionsCtrl);

app.use('/auth', authCtrl);

app.listen(3000);
