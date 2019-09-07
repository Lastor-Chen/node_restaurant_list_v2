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
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)

    const js = { delBtn: "delBtn", catch: 'catchError' }
    res.render('index', { css: 'index', js, restaurants })
  })
})

// export
// =========================

module.exports = router