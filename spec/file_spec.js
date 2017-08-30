const mongoose = require('mongoose')

describe('Files', () => {
  describe('Schema', () => {

    beforeAll(() => {
      this.now = Date.now()
      spyOn(Date, 'now').and.returnValue(this.now)
      const schema = require('../server/file/mongo/model.js')

      this.demoFile = () => {
        return schema({ 
          name: 'will.txt',
          type: 'FILE',
          parentID: 'abc123',
          projectID: 'myProject',
          size: 10000,
          location: 'myBucketKey'
        })
      }
    })

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
})

