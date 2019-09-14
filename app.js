// App Server

// import
// ==============================

// 引入 npm package
const express = require('express')                      // framework
const mongoose = require('mongoose')                    // mongoDB ODM
const exphbs = require('express-handlebars')            // template engine

const methodOverride = require('method-override')       // 控制 form method
const session = require('express-session')              // session 輔助套件
const passport = require('passport')                    // 處理 user authentication
const flash = require('connect-flash')                  // 產生 flash message

// 引入自定義 module
const isAuthed = require('./config/auth.js')

// 環境 setup
// ==============================

const app = express()

// 連接 mongoDB
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongoDB connection error.'))
db.once('open', console.log.bind(console, 'mongoDB is connected.'))

// 設定 template engine
const option = { extname: 'hbs', defaultLayout: 'main' }
  
app.engine('hbs', exphbs(option) )
app.set('view engine', 'hbs')

// Server 相關設定
app.set('port', process.env.PORT || 3000)

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// authentication 相關設定
app.use(flash())
app.use(session({
  secret: 'h0 wu/ fu/ 20 ',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport.js')(passport)       // 執行 passport config

app.use((req, res, next) => {                   // 模板引擎公用變數
  // user info
  res.locals.user = req.user

  // Auth flash message
  res.locals.success = req.flash('success')
  res.locals.warning = req.flash('warning')
  res.locals.error = req.flash('error')

  next()
})

// route 設定
// ==============================

app.use('/users', require('./routers/users.js'))
app.use('/restaurants', isAuthed, require('./routers/restaurants.js'))
app.use('/', isAuthed, require('./routers/index.js'))   // root 必須放最後，請勿更動

// Start Server
// ==============================
app.listen(app.get('port'), () => {
  console.log(`Node.js Server with Express is running => http://localhost:${app.get('port')}`)
})