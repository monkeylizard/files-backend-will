'use strict'

module.exports = (createOne, findById) => {
  return (request, response, next) => {
    return createOne(request.body)
      .then(createdFile => findById(createdFile._id))
      .then(file => response.json(file))
      .catch(next)
  }
}
