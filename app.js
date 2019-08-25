// ////////////////
// 環境設定

// 引入 framework
const express = require('express')
const app = express()

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
const restaurants = require('./restaurant.json')


// ////////////////
// 路由設定
app.get('/', (req, res) => {
  const option = {
    restaurants: restaurants.results,
    partial_css: 'index',
  }

  res.render('index', option)
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

app.get('/restaurants/:id', (req, res) => {
  const id = +req.params.id
  const results = restaurants.results.find(item => item.id === id)
  const option = {
    restaurant: results, 
    partial_css: 'show' 
  }

  res.render('show', option)
})


// ////////////////
// 啟動 Server
app.listen(port, () => {
  console.log(`Node.js Server with Express is running => http://localhost:${port}`)
})