// models restaurant.js

// Model Setup
// ============================

const mongoose = require('mongoose')

const schema = {
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String
  },
  category: {
    type: String
  },
  image: {
    type: String
  },
  location: {
    type: String
  },
  phone: {
    type: String
  },
  google_map: {
    type: String
  },
  rating: {
    type: Number
  },
  description: {
    type: String
  }
}

// timestamps 自動建立時間戳 createdAt, updatedAt
const restaurantSchema = new mongoose.Schema(schema, { timestamps: true })
const Restaurant = mongoose.model('restaurant', restaurantSchema)

// Export
// ============================

module.exports = Restaurant