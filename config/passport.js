// config passport.js

// import
// ==============================

const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')

// 設定 Local Strategy
// ==============================

const localOption = {
  usernameField: 'email'
}

function localCallback (email, password, done) {
  User.findOne({ email }, (err, user) => {
    if (err) return console.error(err)

    // 檢查 email 帳號
    if (!user) return done(null, false, { message: '查無此帳號，請重新輸入' })
    
    // 檢查加鹽後的密碼
    bcrypt.compare(password, user.password, (err, success) => {
      if (err) return console.error(err)

      if (!success) return done(null, false, { message: '密碼不符，請重新輸入' })
      
      done(null, user)
    })
  })
}

function strategy(passport) {
  // 設定 Strategy
  passport.use(new LocalStrategy(localOption, localCallback) )

  // 序列化 session
  passport.serializeUser((user, done) => done(null, user.id))

  // 反序列化 session
  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })
}

// Export
// ============================

module.exports = strategy