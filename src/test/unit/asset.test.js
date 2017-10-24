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

    it('to post a proper filled asset and succeed', function(done) {
        request.post('/api/Assets').send({ 
                "model": "HP Probook", 
                "serial": "2133-3414-111",
                "batchNo": "334912",
                "description": "work-station",
                "createDate": "2017-04-23"}).expect(200, done)
    })

    it('to post a blank-model-name asset and fail', function(done) {
        request.post('/api/Assets').send({ 
                "model": "", 
                "serial": "2133-3414-111",
                "batchNo": "334912",
                "description": "work-station",
                "createDate": "2017-04-23"}).expect(422, done)
    })
})