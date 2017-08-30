module.exports = (model) => {
  return (id) => {
    return model.findOne({ _id: id })
      .lean()
      .exec()
  }
}
