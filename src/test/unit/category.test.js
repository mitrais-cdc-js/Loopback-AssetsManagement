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

	it('to create sub category', function(){
		return Category.findOne({where: {name: category.name}})
			.then( res => {
				var newSubCategory = {
					"name": "Sub 2017 New Sub Category",
					"description": "Sub category description",
					"parent_id": res.id
				}

				return request.post('/api/categories').send(newSubCategory)
					.then( resNewSub => {
						console.log("Subb-----");
						request.delete('/api/categories/' + resNewSub.body.id).then(
							resSubDelete => {
								console.log(resSubDelete);
							}
						)
						console.log("Status: --- " + resNewSub.statusCode);
						expect(resNewSub.statusCode).to.be.equal(200);
					})
			})
	})

	it('to update existing category', function(){
	    
		return Category.findOne({where: {name: category.name }})
			.then(res => {

				console.log("=> categoryId : " + res.id);
		    	var categoryUpdate = {
		    		"name": "2017 New Category Update",
					"description": "Category description update"
				}

				return request.put('/api/categories/' + res.id).send(categoryUpdate)
					.then( resUpdate => {
						console.log("Status Code:");
						expect(resUpdate.statusCode).to.be.equal(200);
					})

			});

	})

	it('to delete single category', function(){
	
		return Category.findOne({where: {name: "2017 New Category Update" }})
			.then(res => {
				console.log("==> categoryId to delete: " + res.id)

				return request.delete('/api/categories/' + res.id)
					.then( resDelete => {
						console.log('deleted rows: ' + JSON.parse(resDelete.text).count);
						expect(JSON.parse(resDelete.text).count).to.be.equal(1);
					})
			})
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

		// process.exit()

	})
})
