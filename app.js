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

// 定義 static files 根目錄位置
app.use(express.static('public'))

// 相關 data 與 設定
const port = process.env.PORT || 3000
// const restaurants = require('./restaurant.json')


// ////////////////
// 路由設定
app.get('/', (req, res) => {
  res.redirect('/index')
})

app.get('/index', (req, res) => {
  Restaurant.find( (err, restaurants) => {
    if (err) return console.error(err)
    res.render('index', { partial_css: 'index', restaurants })
  })
})

app.get('/restaurants/:id', (req, res) => {
  // const results = restaurants.results.find(item => item.id === id)
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    res.render('show', { partial_css: 'show', restaurant })
  }) 
})

app.get('/search', (req, res) => {
  // 將 search keyword 轉成正規表達式來比對餐廳名稱
  const keyword = req.query.keyword
  const regexp = new RegExp(keyword, 'i')
  const results = restaurants.results.filter(item => item.name.match(regexp))
  
  const option = {
    restaurants: results,
    partial_css: 'index',
    keyword: keyword,
  }

  res.render('index', option)
})




// ////////////////
// 啟動 Server
app.listen(port, () => {
  console.log(`Node.js Server with Express is running => http://localhost:${port}`)
})