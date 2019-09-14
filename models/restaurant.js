// models restaurant.js

// Model Setup
// ============================

const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
}

// timestamps 自動建立時間戳 createdAt, updatedAt
const restaurantSchema = new mongoose.Schema(schema, { timestamps: true })
const Restaurant = mongoose.model('restaurant', restaurantSchema)

// Export
// ============================

module.exports = Restaurant