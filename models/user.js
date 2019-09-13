// models user.js

// Model Setup
// ============================

const mongoose = require('mongoose')

const schema = {
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
}

// timestamps 自動建立時間戳 createdAt, updatedAt
const UserSchema = new mongoose.Schema(schema, { timestamps: true })
const User = mongoose.model('User', UserSchema)

// Export
// ============================

module.exports = User