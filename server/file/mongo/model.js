'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  type: {
    type: String,
    default: 'FILE'
  },
  parentId: {
    type: String
  },
  projectId: {
    type: String
  },
  size: {
    type: Number
  },
  location: {
    type: String
  },
  dateModified: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('File', schema)
