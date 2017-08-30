'use strict'

module.exports = (model) => {
  return (data) => {
    data.name = data.originalname
    return model
      .create(data)
      .call('toObject')
  }
}
