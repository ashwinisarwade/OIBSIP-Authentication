const express = require('express')
const router = express.Router()
const userController = require('../Controllers/user')
const auth = require('../middleware/auth')
const path = require('path')

// to render user signup page
router.get('/signup', (req, res) => {
  res.render('signup', {
    isError: false,
    message: ""
  })
})

// to render user login page
router.get('/login', (req, res) => {
  res.render('login', {
    isError: false,
    message: ""
  })
})

// to register new user
router.post('/register', userController.createNewUser)

// to login user
router.post('/log-in', userController.loginUser)

// to render home page after user logged in
router.get('/home', auth, (req, res) => {
  res.render('home', {
    data: req.session.user,
  })
})

// to render abour us page 
router.get('/about', auth, (req, res) => {
  console.log(req.session.userDetails)
  res.render('about', {
    data: req.session.user,
  })
})

// to render contact us page 
router.get('/contact', auth, (req, res) => {
  res.render('contact', {
    data: req.session.user,
  })
})

// to render forgot password page 
router.get('/forgot-password', (req, res) => {
  res.render('forgot-password', {
    data: req.session.user,
    isError:false,
    message:''
  })
})

// to reset password by email
router.post('/reset-passwrd', userController.resetPassword)

// to logout user 
router.get('/logout', auth, (req, res) => {
  req.session.destroy()
  res.redirect('/user/login')
})

module.exports = router    