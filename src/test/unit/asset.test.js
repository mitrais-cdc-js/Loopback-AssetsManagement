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
			.get('/api/assets?filter=%7B%22order%22%3A%20%22createDate%20desc%22%20%7D')
			.expect(200)
	})

	it('to update existing asset', function(){
	    
		return Asset.findOne()
			.then(res => {

				console.log("=> assetId : " + res.id);
		    	var assetUpdate = {
		    		"model": "HP Probook Update",
					"serial": "2133-3414-111 Update",
					"batchNo": "334912 Update",
					"description": "MITRAIS work-station Update",
					"productionDate": "2017-03-01",
					"createDate": res.createDate
				}

				return request.put('/api/assets/' + res.id).send(assetUpdate)
					.then( resUpdate => {
						console.log("Status Code:");
						expect(resUpdate.statusCode).to.be.equal(200);
					})

			});

	})

	it('to delete single asset', function(){

		return Asset.findOne()
			.then(res => {
				console.log("==> assetId to delete: " + res.id)

				return request.delete('/api/assets/' + res.id)
					.then( resDelete => {
						console.log('deleted rows: ' + JSON.parse(resDelete.text).count);
						expect(JSON.parse(resDelete.text).count).to.be.equal(1);
					})
			})
	})

	after(function() {
		process.exit()
	})
})