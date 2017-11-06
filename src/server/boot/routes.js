module.exports = function(app) {
    // Install a "/ping" route that returns "pong"

    app.get('/assets-p', function(req, res){
        console.log(req.query._sort);
        console.log(req.query._order);
        console.log(req.query._page);
        console.log(req.query._limit);

        var skip = (req.query._page - 1) * req.query._limit;

        console.log(`/api/assets?filter[order]=${req.query._sort} ${req.query._order}&filter[limit]=${req.query._limit}&filter[skip]=${skip}`);
        res.redirect(`/api/assets?filter[order]=${req.query._sort} ${req.query._order}&filter[limit]=${req.query._limit}&filter[skip]=${skip}`);
       //res.redirect(`/api/assets?filter[limit]=${req.query._limit}&filter[skip]=${skip}`);
    });
  }