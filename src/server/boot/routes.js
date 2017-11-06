module.exports = function(app) {
    // Install a "/ping" route that returns "pong"

    const CUSTOM_IN_ROUTE_ASSET_PAGING = '/api/assets-p';
    const CUSTOM_OUT_ROUTE_ASSET_PAGING = '/api/assets';

    app.get(`${CUSTOM_IN_ROUTE_ASSET_PAGING}`, function(req, res){

        console.log(`incoming custom route: ${CUSTOM_IN_ROUTE_ASSET_PAGING}?_sort=${req.query._sort}&_order=${req.query._order}&_limit=${req.query._limit}&_page=${req.query._page}`);

        if(!req.query._sort || !req.query._order) {
            res.redirect(`${CUSTOM_OUT_ROUTE_ASSET_PAGING}`);
        }

        var skip = (req.query._page - 1) * (req.query._limit - 1);

        if(isNaN(skip)) {
            skip = 0;
        }

        console.log(`outgoing custom route: ${CUSTOM_OUT_ROUTE_ASSET_PAGING}?filter[order]=${req.query._sort} ${req.query._order}&filter[limit]=${req.query._limit}&filter[skip]=${skip}`);   
       
        res.redirect(`${CUSTOM_OUT_ROUTE_ASSET_PAGING}?filter[order]=${req.query._sort} ${req.query._order}&filter[limit]=${req.query._limit}&filter[skip]=${skip}`);
    });
  }