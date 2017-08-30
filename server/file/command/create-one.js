'use strict'

module.exports = (model) => {
  return (data) => {
    return model
      .create(data)
      .call('toObject')
  }
}
