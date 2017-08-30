'use strict'

const file = require('../mongo/model.js')
console.log('>>>')
const findByProject = require('../query/find-by-project.js')(file)

module.exports = require('./find-handler.js')(findByProject)
