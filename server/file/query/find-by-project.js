module.exports = (model) => {
  return (projectId) => {
    return model.find({ projectId: projectId })
      .lean()
      .exec()
  }
}
