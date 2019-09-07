// router search.js

// 宣告
// =========================

const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// route '/search'
// =========================

router.get('/', (req, res) => {
  // 將 search keyword 轉成正規表達式來比對餐廳名稱
  const keyword = req.query.keyword
  const regexp = new RegExp(keyword, 'i')

  Restaurant.find((err, collection) => {
    if (err) return console.error(err)

    // 過濾 name & category
    const restaurants = collection.filter(
      item => item.name.match(regexp) || item.category.match(regexp)
    )

    const js = { delBtn: "delBtn", catch: 'catchError' }
    res.render('index', { css: 'index', js, restaurants, keyword })
  })
})

// export
// =========================

module.exports = router