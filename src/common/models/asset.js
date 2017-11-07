'use strict';

module.exports = function(Asset) {

	Asset.observe('before save', function (ctx, next) {
		if (ctx.instance) {
			if(typeof(ctx.instance.geolocation) == 'undefined' ) {
				ctx.instance.geolocation = { 'lat':0, 'lng': 0 };
				console.log(ctx.instance.geolocation);
			}
		}
		next();
	  });

	Asset.beforeRemote( 'assetsPaging', function( ctx, unused, next ) {
		Asset.count('', function (err, count) {
			console.log(`Asset X-Total-Count: ${count}`);
			ctx.res.set('Access-Control-Expose-Headers', 'x-total-count');
			ctx.res.set('x-total-count', count);
			next();
		})
	});

	Asset.assetsPaging = function(_sort, _order, _limit, _page, callback) {
		console.log(`IN custom: /api/assets_paging?_sort=${_sort}&_order=${_order}&_limit=${_limit}&_page=${_page}`);

		if(typeof(_sort) == 'undefined') { 
			_sort = "creationDate";
		}
		if(typeof(_order) == 'undefined') {
			_order = "DESC";
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

		Asset.find({ order: _sort + " " + _order, limit: _limit, skip: skip_calc })
			.then( assets => { callback(null, assets); })
			.catch( e => callback(null, e));
	};

	Asset.validatesPresenceOf(  'model', 'serial', 'batchNo', 
								'description', 'createDate', 'productionDate' );

	Asset.validatesLengthOf('model', {
		min: 3,
		max: 100,
		message: {
			min: 'The asset model name should be at least 3 characters long',
			max: 'The asset model name is to long'
		}
	})

	Asset.validatesLengthOf('serial', {
		min: 3,
		max: 100,
		message: {
			min: 'The asset serial number should be at least 3 characters long',
			max: 'The asset serial number is to long'
		}
	})

	Asset.validatesLengthOf('batchNo', {
		min: 3,
		max: 100,
		message: {
			min: 'The asset batch number should be at least 3 characters long',
			max: 'The asset batch number is to long'
		}
	})

	Asset.validatesLengthOf('description', {
		min: 5,
		max: 100,
		message: {
			min: 'The asset description should be at least 5 characters long',
			max: 'The asset description is to long'
		}
	})

	Asset.validatesLengthOf('history', {
		max: 100,
		allowNull: true,
		allowBlank: true,
		message: {
			max: 'The asset history is to long'
		}
	})

	Asset.validatesInclusionOf('riskLevel', {
		in: [1], 
		allowNull: true,
		allowBlank: true,
		message: 'is not allowed' 
	});

	Asset.validatesInclusionOf('complianceStatus', {
		in: ['COMPLIANT'], 
		allowNull: true,
		allowBlank: true,
		message: 'is not allowed' 
	});

	Asset.validatesInclusionOf('status', {
		in: ['OK', 'OVERDUE INSPECTITON', 'DO NOT USE'], 
		allowNull: true,
		allowBlank: true,
		message: 'is not allowed' 
	});
};
