module.exports = (model, id) => {
  return model.findOne({ _id: id })
    .lean()
    .exec()
}
