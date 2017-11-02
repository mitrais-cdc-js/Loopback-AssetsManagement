const { app, expect, request } = require('../common')

const now = new Date()
const Asset = app.models.Asset
const asset = new Asset({ 
    "model": "HP Probook", 
    "serial": "2133-3414-111",
    "batchNo": "334912",
    "description": "MITRAIS work-station",
    "createDate": now.toString(),
    "productionDate": "2017-03-01" })

describe('It should resolve', function() {
    it('a Asset.find', function() {
        return Asset
            .find()
            .then(res => console.log(res))
    })
})

describe('It should resolve the routes', function() {
    before(function() {
    })

    beforeEach(function(done) {
        Asset.create({ "model": "", "serial": "", "batch-no": "", "description": "" }, 
            function() { done() })
    })

    it('to post a proper filled asset and succeed', function(done) {
        request.post('/api/Assets').send(asset).expect(200, done)
    })

    it('to post a blank-model-name asset and fail', function(done) {
        request.post('/api/Assets').send({  
                "serial": "2133-3414-111",
                "batchNo": "334912",
                "description": "work-station",
                "createDate": "2017-04-23",
                "productionDate": "2017-03-01" }).expect(422, done)
    })

    it('to post a blank-serial-name asset and fail', function(done) {
        request.post('/api/Assets').send({ 
                "model": "HP Probook", 
                "batchNo": "334912",
                "description": "work-station",
                "createDate": "2017-04-23",
                "productionDate": "2017-03-01" }).expect(422, done)
    })

    it('to post a blank-batchNo-name asset and fail', function(done) {
        request.post('/api/Assets').send({ 
                "model": "HP Probook", 
                "serial": "2133-3414-111",
                "description": "work-station",
                "createDate": "2017-04-23",
                "productionDate": "2017-03-01" }).expect(422, done)
    })

    it('to post a blank-description asset and fail', function(done) {
        request.post('/api/Assets').send({ 
                "model": "HP Probook", 
                "serial": "2133-3414-111",
                "batchNo": "334912",
                "createDate": "2017-04-23",
                "productionDate": "2017-03-01" }).expect(422, done)
    })

    it('to post a blank-createDate asset and fail', function(done) {
        request.post('/api/Assets').send({ 
                "model": "HP Probook", 
                "serial": "2133-3414-111",
                "batchNo": "334912",
                "description": "work-station",
                "productionDate": "2017-03-01" }).expect(422, done)
    })

    it('to post a blank-productionDate asset and fail', function(done) {
        request.post('/api/Assets').send({ 
                "model": "HP Probook", 
                "serial": "2133-3414-111",
                "batchNo": "334912",
                "description": "work-station",
                "createDate": "2017-04-23" }).expect(422, done)
    })
    
    it('to get all assets and succeed', function() {
        return request
            .get('/api/Assets')
            .expect(200)
    })

    it('to get asset that we just added and succeed', function() {
        return request
            .get('/api/Assets/1')
            .expect(res => res === asset)
    })

    it('to get a non existing asset and failed', function() {
        return request
            .get('/api/Assets/2')
            .expect(404)
    })
    
    it('to get all assets ordered by latest created date first and succeed', function() {
        return request
            .get('/api/assets/sort_create_date?sort=asc')
            .expect(200)
    })
})