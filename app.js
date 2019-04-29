const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();

//load Router test

const ideas = require('./routes/ideas')
const users = require('./routes/users')

// Passport config
require('./config/passport')(passport);

// DB config

const db = require('./config/database');

// connect to mongoose

mongoose.connect(db.mongoURI, {
  //useMongoClient: true,
  useNewUrlParser: true
})
  .then(() => console.log('MongoDbConnected...'))
  .catch(err => console.log(err));



//HandleBar middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Method Override middleware
app.use(methodOverride('_method'));

// Express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true 
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
// Global variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})


// index Route
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', {
    title: title
  });
});

// about Route
app.get('/about', (req, res) => {
  res.render('about');
})


app.use('/ideas',ideas)
app.use('/users',users)



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server start on port ${port}`)
});
