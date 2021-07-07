// router OAuth.js

// import
// =========================

const express = require('express')
const router = express.Router()
const passport = require('passport')

// Routes '/OAuth'
// ============================

router.get('/facebook', 
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
)

router.get('/facebook/callback', 
  passport.authenticate('facebook', {
    successRedirect: '/index',
    failureRedirect: '/users/signin'
  })
)

// Export
// ============================

module.exports = router