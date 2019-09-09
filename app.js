// App Server

// import
// ==============================

// 引入 npm package
const express = require('express')                      // framework
const mongoose = require('mongoose')                    // mongoDB ODM
const exphbs = require('express-handlebars')            // template engine
const methodOverride = require('method-override')       // middleware

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

// Server 相關 setting
app.set('port', process.env.PORT || 3000)

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


// route 設定
// ==============================

app.use('/', require('./routers/index.js'))
app.use('/restaurants', require('./routers/restaurants.js'))


// Start Server
// ==============================
app.listen(app.get('port'), () => {
  console.log(`Node.js Server with Express is running => http://localhost:${app.get('port')}`)
})