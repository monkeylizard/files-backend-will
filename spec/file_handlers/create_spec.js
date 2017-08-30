const createHandler = require('../../server/file/handlers/create-handler.js')

describe('File create handler', () => {
  beforeEach(() => {
    this.expectedData = {
      _id: 'abc123',
      some: 'data'
    }

    this.createOne = jasmine.createSpy('create one')
      .and.returnValue(Promise.resolve({ _id: 'abc123' }))

    this.findById = jasmine.createSpy('find by id')
      .and.returnValue(Promise.resolve(this.expectedData))

    this.request = { body: 'some body' }
    this.response = { json: jasmine.createSpy('render json').and.returnValue(true) }
    this.next = jasmine.createSpy('next')

    this.createFile = createHandler(this.createOne, this.findById)
  })
  it('creates a file record', (done) => {
    this.createFile(this.request, this.response, this.next)
      .then(() => { 
        expect(this.createOne).toHaveBeenCalledWith('some body')
        done()
      })
  })

  it('finds the created file record', (done) => {
    this.createFile(this.request, this.response, this.next)
      .then(() => {
        expect(this.findById).toHaveBeenCalledWith('abc123')
        done()
      })
  })

  it('returns the file metadata as json', (done) => {
    this.createFile(this.request, this.response, this.next)
      .then(() => {
        expect(this.response.json).toHaveBeenCalledWith(this.expectedData)
        done()
      })
  })

  it('continues to the next handler if an error is thrown', (done) => {
    this.createOne.and.returnValue(Promise.reject('oops!'))

    this.createFile(this.request, this.response, this.next)
      .then(() => {
        expect(this.next).toHaveBeenCalled()
        done()
      })
  })
})
