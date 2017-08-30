'use strict'

module.exports = (model, data) => {
  return model
    .create(data)
    .call('toObject')
}
