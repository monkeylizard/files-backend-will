'use strict'

module.exports = (createOne, findById) => {
  return (request, response, next) => {
    return createOne(request.file)
      .then(createdFile => findById(createdFile._id))
      .then(file => response.json(file))
      .catch(next)
  }
}
