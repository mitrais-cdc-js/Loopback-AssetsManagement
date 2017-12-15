'use strict';

module.exports = function(Category) {
	// pass this filter for nested category:
	// endpoint: /api/Categories?filter
	// {
	// 	"include":{
	// 	   "relation":"categories",
	// 	   "scope":{
	// 		  "include":{
	// 			 "relation":"categories"
	// 		  }
	// 	   }
	// 	}
	//  }
	// reference: https://github.com/strongloop/loopback/issues/2075

	
	Category.beforeRemote( 'catPaging', function( ctx, unused, next ) {
		Category.count('', function (err, count) {
			console.log(`Asset X-Total-Count: ${count}`);
			ctx.res.set('Access-Control-Expose-Headers', 'x-total-count');
			ctx.res.set('x-total-count', count);
			next();
		})
	});

	Category.catPaging = function(_sort, _order, _limit, _page, callback) {
		console.log(`IN custom: /api/category_paging?_sort=${_sort}&_order=${_order}&_limit=${_limit}&_page=${_page}`);

		if(typeof(_sort) == 'undefined') {
			_sort = "name";
		}
		if(typeof(_order) == 'undefined') {
			_order = "ASC";
		}
		if(typeof(_limit) == 'undefined') {
			_limit = 0;
		}
		if(typeof(_page) == 'undefined') {
			_page = 0;
		} else {
			_page = _page >= 1 ? _page - 1 : 0;
		}

		var skip_calc = _page * _limit;

		Category.find({ order: _sort + " " + _order, limit: _limit, skip: skip_calc, include: {relation:"category"}})
			.then( category => { callback(null, category); })
			.catch( e => callback(null, e));
	};

  Category.validatesUniquenessOf('name');


};
