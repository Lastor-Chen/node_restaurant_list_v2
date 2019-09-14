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
  res.render('signin', { js: ['popUp'], css: 'sign', signin: 'signin' })
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
  res.render('signup', { js: ['popUp'], css: 'sign' })
})

router.post('/signup', (req, res, next) => {
  // 深拷貝，保護原資料讓 passport 能抓取原始密碼
  const input = { ...req.body }  

  let error = ''
  if (!input.email || !input.password) { error = 'Email 與 Password 不得為空' }
  if (input.password !== input.password2) { error = '密碼不一致' }

  if (error.length) return res.render('signup', { input, error, css: 'sign' })

  User.findOne({ email: input.email }, (err, user) => {
    if (err) console.error(err)

    // 如果 email 已註冊
    error = '此 Email 已被使用'
    if (user) return res.render('signup', { input, error, css: 'sign' })
    
    // 密碼加鹽雜湊化，儲存帳戶到資料庫
    bcrypt.hash(input.password, 10, async (err, hash) => {
      if (err) return console.error(err)
      
      input.password = hash
      await User.create(input)

      // 資料庫儲存後，直接發 auth 憑證使登入
      passport.authenticate('local', {
        successRedirect: '/index',
        failureRedirect: '/users/signin',
        failureFlash: true
      })(req, res, next)
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