// router index.js

// 宣告
// =========================

const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// route '/'
// =========================

router.get('/', (req, res) => {
  res.redirect('/index')
})

router.get('/index', (req, res) => {
  // 將 search 轉成正規表達式來比對餐廳名稱
  const search = req.query.search
  const regexp = new RegExp(search, 'i')

  // 儲存 sort 選擇
  const sortMap = {
    '-createdAt': '按最新',
    createdAt: '按最舊',
    name: '按名稱',
    category: '按類別',
    '-rating': '按評價',
  }
  const sortKeys = Object.keys(sortMap)
  const sort = req.query.sort

  Restaurant.find()
    .sort(sort)
    .exec((err, restaurants) => {
      if (err) return console.error(err)

      // 如有 search，篩選 name & category
      if (search) { 
        restaurants = restaurants.filter(
          item => item.name.match(regexp) || item.category.match(regexp)
        )
      }
      
      const js = { delBtn: "delBtn", catch: 'catchError' }
      res.render('index', { css: 'index', js, restaurants, sortMap, sortKeys, sort, search })
    })
})

// export
// =========================

module.exports = router