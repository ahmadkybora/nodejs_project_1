const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require('bcpassport');
const app = express();

const ideas = require('./routes/ideas');
const users = require('./routes/users');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    //cookie: {secure: true}
}));
app.use(flash());

app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('');
});

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/nodejs_project_1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
})
    .then(() => console.log('MongooDb Connected'))
    .catch(err => {
        console.log(err)
    });

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    const title = 'welcome';

    res.render('index', {
        title: title
    });
});

app.get('/about', (req, res) => {
    const title = 'about';
    res.render('about', {
        title: title
    });
});



app.use('/ideas', ideas);
app.use('/users', users);

const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
