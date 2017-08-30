'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  parentID: {
    type: String
  },
  projectID: {
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
