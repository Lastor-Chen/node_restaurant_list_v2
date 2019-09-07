// ////////////////
// 環境設定

// 引入 framework
const express = require('express')
const app = express()

// 引入資料庫 ODM
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongoDB connection error.'))
db.once('open', console.log.bind(console, 'mongoDB is connected.'))

// 引入 mongoose model
const Restaurant = require('./models/restaurant.js')

// 設置 template engine
const exphbs = require('express-handlebars')
const option = {
  extname: 'hbs',
  defaultLayout: 'main',
}

app.engine('hbs', exphbs(option) )
app.set('view engine', 'hbs')

// 引入 method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// Server 相關 setting
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 3000)


// ////////////////
// 路由設定

app.use('/', require('./routers/index.js'))
app.use('/search', require('./routers/search.js'))
app.use('/restaurants', require('./routers/restaurants.js'))

// ////////////////
// 啟動 Server
app.listen(app.get('port'), () => {
  console.log(`Node.js Server with Express is running => http://localhost:${app.get('port')}`)
})