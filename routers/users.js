// router users.js

// import
// =========================

const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const passport = require('passport')

// route '/users'
// =========================

// 登入
router.get('/signin', (req, res) => { 
  res.render('signin')
})

router.post('/signin', 
  passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/users/signin'
  })
)

// 註冊
router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', (req, res) => {
  console.log(req.body)
  const input = req.body

  User.findOne({ email: input.email }, (err, user) => {
    if (err) console.error(err)

    // 如果 email 已註冊
    if (user) return res.send('email已被註冊')
    
    // 確認 email 未註冊過，儲存帳戶到資料庫
    User.create(input, (err) => console.error(err))
    res.redirect('/index')
  })
})

// 登出
router.get('/signout', (req, res) => {
  req.logout()
  res.redirect('/users/signin')
})

// export
// =========================

module.exports = router