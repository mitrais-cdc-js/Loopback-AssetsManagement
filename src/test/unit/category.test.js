const { app, expect, request } = require('../common')

const now = new Date()
const Category = app.models.Category
const category = new Category({ 
	"name": "2017 New Category",
	"description": "Category description",
	"createdAt": now.toString()})

describe('It should resolve category routes', function() {
	
	before(function() {
		Category.findOne({where: {name: category.name }})
		.then( res => {
			console.log('delete category');
			
			if (res){
				request.delete('/api/categories/' + res.id)
				.then( resDelete => {
					console.log('deleted rows: ' + JSON.parse(resDelete.text).count);
				})
			}
		})

	})

	it('to display list all categories', function() {
		return request
		.get('/api/categories')
		.expect(200)
	})

	

	it('to post a proper filled category and succeed', function(done) {
		request.post('/api/categories').send(category).expect(200, done)
	})

	it('to post a blank name category and fail', function(done) {
		request.post('/api/categories').send({
			"description": "category desc"
		}).expect(422, done)
	})

	it('to post a blank description category and fail', function(done) {
		request.post('/api/categories').send({
			"name": "category name"
		}).expect(422, done)
	})

	after(function() {
		Category.findOne({where: {name: category.name }})
		.then( res => {
			console.log('delete category');
			// console.log(res);
			if (res){
				request.delete('/api/categories/' + res.id)
				.then( resDelete => {
					console.log('deleted rows: ' + JSON.parse(resDelete.text).count);
				})
			}
		})

		process.exit()

	})
})
