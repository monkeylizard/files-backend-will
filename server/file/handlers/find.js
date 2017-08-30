'use strict'

const file = require('../mongo/model')
const findByProject = require('../query/find-by-project.js')(file)

module.exports = require('./find-handler.js')(findByProject)
