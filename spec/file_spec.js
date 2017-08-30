const mongoose = require('mongoose')
const demoData = { 
  name: 'will.txt',
  type: 'FILE',
  parentID: 'abc123',
  projectID: 'myProject',
  size: 10000,
  location: 'myBucketKey'
}

const expectedData = {
  name: 'will.txt',
  type: 'FILE',
  parentID: 'abc123',
  projectID: 'myProject',
  size: 10000,
  location: 'myBucketKey',
  createdAt: this.now
}

describe('Files', () => {
  beforeAll(() => {
    this.now = Date.now()
    spyOn(Date, 'now').and.returnValue(this.now)

    this.model = require('../server/file/mongo/model')

    this.demoFile = () => {
      return this.model(demoData)
    }
  })

  describe('Schema', () => {
    it('has a file name', () => {
      expect(this.demoFile().name).toEqual('will.txt')
    })

    it('has a type', () => {
      expect(this.demoFile().type).toEqual('FILE')
    })

    it('has a parent id', () => {
      expect(this.demoFile().parentID).toEqual('abc123')
    })

    it('has a project id', () => {
      expect(this.demoFile().projectID).toEqual('myProject')
    })

    it('has a size', () => {
      expect(this.demoFile().size).toEqual(10000)
    })

    it('has a location', () => {
      expect(this.demoFile().location).toEqual('myBucketKey')
    })

    it('records its date modified', () => {
      expect(Number(this.demoFile().dateModified)).toEqual(this.now)
    })
  })

  describe('Creation', () => {
    it('can create a file', () => {
      spyOn(this.model, 'create').and.returnValue(this.model)
      spyOn(this.model, 'call').and.returnValue(expectedData)

      const createFile = require('../server/file/command/create-one.js')(this.model)

      expect(createFile(demoData)).toEqual(expectedData)
      expect(this.model.call).toHaveBeenCalledWith('toObject')
    })
  })

  describe('Find', () => {
    beforeEach(() => {
      this.findById = require('../server/file/query/find-by-id.js')(this.model)

      this.query = {
        lean: jasmine.createSpy('lean'),
      }

      this.leanQuery = {
        exec: jasmine.createSpy('exec')
      }

      spyOn(this.model, 'findOne').and.returnValue(this.query)
      this.query.lean.and.returnValue(this.leanQuery)
      this.leanQuery.exec.and.returnValue(expectedData)
    })

    it('can find a file by id', () => {
      expect(this.findById('abc123')).toEqual(expectedData)
    })

    it('finds the specified file', () => {
      this.findById('abc123')
      expect(this.model.findOne).toHaveBeenCalledWith({ _id: 'abc123' })
    })

    it('gets the lean version of the model', () => {
      this.findById('abc123')

      expect(this.query.lean).toHaveBeenCalled()
    })
  })
})
