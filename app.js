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

// Server 相關 setting
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 3000)


// ////////////////
// 路由設定
app.get('/', (req, res) => {
  res.redirect('/index')
})

app.get('/index', (req, res) => {
  Restaurant.find( (err, restaurants) => {
    if (err) return console.error(err)
    res.render('index', { css: 'index', js: 'catchError', restaurants })
  })
})

app.get('/restaurants/new', (req, res) => {
  res.render('newEdit', { new: 'new' })
})

app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    res.render('newEdit', { restaurant })
  })
})

app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    res.render('show', { css: 'show', js: 'catchError', restaurant })
  }) 
})

app.get('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      res.redirect('/')
    })
  })
})

app.get('/search', (req, res) => {
  // 將 search keyword 轉成正規表達式來比對餐廳名稱
  const keyword = req.query.keyword
  const regexp = new RegExp(keyword, 'i')

  Restaurant.find( (err, collection) => {
    if (err) return console.error(err)

    // 過濾 name & category
    const restaurants = collection.filter(
      item => item.name.match(regexp) || item.category.match(regexp)
    )
    res.render('index', { css: 'index', js: 'catchError', restaurants, keyword })
  })
})

app.post('/restaurants/new', (req, res) => {
  const input = req.body

  Restaurant.create(input)
  res.redirect('/')
})

app.post('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)

    for (const key in req.body) {
      restaurant[key] = req.body[key]
    }
    restaurant.save(err => {
      if (err) return console.error(err)
      res.redirect('/restaurants/' + req.params.id)
    })
  })
})

// ////////////////
// 啟動 Server
app.listen(app.get('port'), () => {
  console.log(`Node.js Server with Express is running => http://localhost:${app.get('port')}`)
})