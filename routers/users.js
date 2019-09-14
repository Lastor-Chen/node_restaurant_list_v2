// router users.js

// import
// =========================

const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// route '/users'
// =========================

// 登入
router.get('/signin', (req, res) => { 
  res.render('signin')
})

router.post('/signin', 
  passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/users/signin',
    failureFlash: true,
    badRequestMessage: '您沒有輸入帳號或密碼'
  })
)

// 註冊
router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', (req, res, next) => {
  const input = { ...req.body }

  let error = ''
  if (!input.email || !input.password) { error = 'Email 與 Password 不得為空' }
  if (input.password !== input.password2) { error = '密碼不一致' }

  if (error.length) return res.render('signup', { input, error })

  User.findOne({ email: input.email }, (err, user) => {
    if (err) console.error(err)

    // 如果 email 已註冊
    if (user) return res.render('signup', { input, error: '此 Email 已被使用' })
    
    // 密碼加鹽雜湊化，儲存帳戶到資料庫
    bcrypt.hash(input.password, 10, (err, hash) => {
      if (err) return console.error(err)
      
      input.password = hash
      User.create(input)
      res.redirect('/users/signin')
    })

  })
})

// 登出
router.get('/signout', (req, res) => {
  req.logout()
  req.flash('success', '您已成功登出')
  res.redirect('/users/signin')
})

// export
// =========================

module.exports = router