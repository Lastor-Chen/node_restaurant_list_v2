// models user.js

// Model Setup
// ============================

const mongoose = require('mongoose')

const schema = {
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}

// timestamps 自動建立時間戳 createdAt, updatedAt
const UserSchema = new mongoose.Schema(schema, { timestamps: true })
const User = mongoose.model('User', UserSchema)

// Export
// ============================

module.exports = User