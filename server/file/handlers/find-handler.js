module.exports = (findByProject) => {
  return (request, response, next) => {
    return findByProject(request.query.projectId)
      .then((files) => { 
        return response.json(files)
      })
      .catch(next)
  }
}
