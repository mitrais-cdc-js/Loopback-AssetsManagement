const { app, expect, request } = require('../common')

const Asset = app.models.Asset

describe('It should resolve', function() {
    it('a Asset.find', function() {
        return Asset
            .find()
            .then(res => console.log(res))
    })
})

describe('It should resolve the routes', function() {

    var Asset

    before(function() {
        Asset = app.models.Asset
    })

    beforeEach(function(done) {
        Asset.create({ "model": "", "serial": "", "batch-no": "", "description": "" }, 
            function() { done() })
    })

    it('to post a new asset', function(done) {
        request.post('/api/Assets').send({  }).expect(200, done)
    })
})