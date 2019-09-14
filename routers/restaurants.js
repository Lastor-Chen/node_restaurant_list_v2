// router restaurants.js

// import
// =========================

const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// tool function
// =========================

function getOwnerId(req) {
  return { _id: req.params.id, userId: req.user.id }
}

// route '/restaurants'
// =========================

router.get('/new', (req, res) => {
  res.render('newEdit', { new: 'new' })
})

router.get('/:id/edit', (req, res) => {
  Restaurant.findOne(getOwnerId(req), (err, restaurant) => {
    if (err) return console.error(err)

    // 如透過不當途徑他人的餐廳資料，跳轉回 index
    if (!restaurant) {
      req.flash('error', '警告：您未擁有相關權限，請使用正常途徑進行訪問。')
      return res.redirect('/index')
    }

    res.render('newEdit', { restaurant })
  })
})

router.get('/:id', (req, res) => {
  Restaurant.findOne(getOwnerId(req), (err, restaurant) => {
    if (err) return console.error(err)

    // 如透過不當途徑他人的餐廳資料，跳轉回 index
    if (!restaurant) { 
      req.flash('error', '警告：您未擁有相關權限，請使用正常途徑進行訪問。')
      return res.redirect('/index')
    }

    const js = { delBtn: "delBtn", catch: 'catchError' }
    res.render('show', { css: 'show', js, restaurant })
  })
})

router.delete('/:id/delete', (req, res) => {
  Restaurant.findOne(getOwnerId(req), (err, restaurant) => {
    if (err) return console.error(err)

    // 如透過不當途徑他人的餐廳資料，跳轉回 index
    if (!restaurant) {
      req.flash('error', '警告：您未擁有相關權限，請使用正常途徑進行訪問。')
      return res.redirect('/index')
    }

    restaurant.remove(err => {
      if (err) return console.error(err)
      res.redirect('/index')
    })
  })
})

router.post('/new', (req, res) => {
  const input = { ...req.body }  // 深拷貝，保護原始資料
  input.userId = req.user.id

  Restaurant.create(input)
  res.redirect('/index')
})

router.put('/:id/edit', (req, res) => {
  Restaurant.findOne(getOwnerId(req) , (err, restaurant) => {
    if (err) return console.error(err)

    // 如透過不當途徑他人的餐廳資料，跳轉回 index
    if (!restaurant) {
      req.flash('error', '警告：您未擁有相關權限，請使用正常途徑進行訪問。')
      return res.redirect('/index')
    }

    // 批次修改資料
    for (const key in req.body) {
      restaurant[key] = req.body[key]
    }
    restaurant.save(err => {
      if (err) return console.error(err)
      res.redirect('/restaurants/' + req.params.id)
    })
  })
})

// export
// =========================

module.exports = router