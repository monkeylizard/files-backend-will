'use strict'

const file = require('../mongo/model.js')
const findById = require('../query/find-by-id.js')(file)
const createOne = require('../command/create-one.js')(file)

module.exports = require('./create-handler.js')(createOne, findById)
