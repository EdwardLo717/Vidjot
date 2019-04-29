const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

//load user model
require('../models/user');
const User = mongoose.model('users');


// User login Route
router.get('/login', (req, res) => {  
  res.render('users/login');
}) 

// User register Route
router.get('/register', (req, res) => {
  res.render('users/register');
});

// Login from Post
router.post('/login',(req, res, next) => {
  passport.authenticate('local',{
    successRedirect: '/ideas',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});


//Register Form Post
router.post('/register', (req, res) => {
  let errors = [];
  if (req.body.password !== req.body.password2) {
    errors.push({ text: 'Passwords do not match' })
  };
  if (req.body.password.length < 4) {
    errors.push({ text: 'Passwords must be at least 4 charaters' })
  };
  User.findOne({ email: req.body.email})
    .then(user => {
      if (user) {        
        errors.push({ text: 'This Email is alredy registered before'});
      }
    });

  if (errors.length > 0) {
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    })
  } else {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) =>{
        if (err) throw err;
        newUser.password = hash;
        new User(newUser)
          .save()
          .then(idea => {            
            req.flash('success_msg', 'You are now registered and can login in');
            res.render('users/login');           
          })
          .catch(err => {
            console.log(err);
            return;
          })
        })    
    });    
  }
})

// Logout 

router.get('/logout',(req, res)=>{
  req.logout();
  req.flash('success_msg', 'You are logged out')
  res.redirect('/users/login');
});


module.exports = router
