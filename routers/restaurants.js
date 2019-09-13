// router restaurants.js

// import
// =========================

const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// route '/restaurants'
// =========================

router.get('/new', (req, res) => {
  res.render('newEdit', { new: 'new' })
})

router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    res.render('newEdit', { restaurant })
  })
})

router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)

    const js = { delBtn: "delBtn", catch: 'catchError' }
    res.render('show', { css: 'show', js, restaurant })
  })
})

router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      res.redirect('/')
    })
  })
})

router.post('/new', (req, res) => {
  const input = req.body

  Restaurant.create(input)
  res.redirect('/')
})

router.put('/:id/edit', (req, res) => {
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

// export
// =========================

module.exports = router