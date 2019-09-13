// router users.js

// import
// =========================

const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

// route '/users'
// =========================

router.get('/signin', (req, res) => {
  res.render('signin')
})

router.post('/signin', (req, res) => {
  res.render('signin')
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', (req, res) => {
  res.render('signup')
})

// export
// =========================

module.exports = router