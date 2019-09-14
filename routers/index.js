// router index.js

// 宣告
// =========================

const express = require('express')
const router = express.Router()

const Restaurant = require('../models/restaurant.js')       // mongoose Modal
const sortList = require('../models/sortList.js')           // sort 列表

// route '/'
// =========================

router.get('/', (req, res) => {
  res.redirect('/index')
})

router.get('/index', (req, res) => {
  // 儲存 search，轉成 RegExp
  const search = req.query.search
  const regexp = new RegExp(search, 'i')

  // 儲存 user 選擇的 sort
  const sort = req.query.sort

  Restaurant.find({ userId: req.user.id })
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
      res.render('index', { css: 'index', js, restaurants, sortList, sort, search })
    })
})

// export
// =========================

module.exports = router