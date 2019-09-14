// models/seeds restaurantSeeder.js

// 宣告
// =========================

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../user.js')
const users = require('./users.json').results

const Restaurant = require('../restaurant.js')
const restaurants = require('./restaurants.json').results

// 主執行序
// =========================

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongoDB connection error.'))

db.once('open', async () => {
  console.log('mongoDB is connected')
  console.log('Just a moment. Data is creating...')

  // 生成 user doc
  for (const user of users) {
    // 密碼加鹽 Sync
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash

    // 等待 mongoDB 儲存
    await User.create(user)
  }

  // 生成 restaurant doc，關聯 user id
  User.find(async (err, users) => {
    if (err) console.error(err)

    // 取前 6 個餐廳
    const newRestaurants = restaurants.slice(0, 6)

    // 將 user id 注入餐廳
    for (let index = 0; index <= 5; index++) {
      if (index <= 2) { newRestaurants[index].userId = users[0].id }
      if (index >= 3) { newRestaurants[index].userId = users[1].id }
    }

    // 等待 mongoDB 儲存
    await Restaurant.create(...newRestaurants)

    console.log('\nmongoDB=> sample doc is created from seed.')
    process.exit()
  })
})