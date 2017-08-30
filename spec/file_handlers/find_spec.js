const findHandler = require('../../server/file/handlers/find-handler.js')

describe('File find handler', () => {
  beforeEach(() => {
    this.expectedData = [
      {
        _id: 'abc123',
        some: 'data'
      },
      {
        _id: 'def456',
        some: 'other data'
      }
    ]

    this.findByProject = jasmine.createSpy('find by project')
      .and.returnValue(Promise.resolve(this.expectedData))

    this.request = { query: { projectId: 'myProject' } }
    this.response = { json: jasmine.createSpy('render json').and.returnValue(true) }
    this.next = jasmine.createSpy('next')

    this.find = findHandler(this.findByProject)
  })

  it('finds the created file record', (done) => {
    this.find(this.request, this.response, this.next)
      .then(() => {
        expect(this.findByProject).toHaveBeenCalledWith('myProject')
        done()
      })
  })

  it('returns the found files metadata as json', (done) => {
    this.find(this.request, this.response, this.next)
      .then(() => {
        expect(this.response.json).toHaveBeenCalledWith(this.expectedData)
        done()
      })
  })

  it('continues to the next handler if an error is thrown', (done) => {
    this.findByProject.and.returnValue(Promise.reject('oops!'))

    this.find(this.request, this.response, this.next)
      .then(() => {
        expect(this.next).toHaveBeenCalled()
        done()
      })
  })
})
