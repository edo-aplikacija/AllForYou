// LOAD MODULES
// =============================================================================
var rootPath = '../../';
var watchesRepo = require(rootPath + 'repositories/watches/watchesRepo');
// PUBLIC METHODS
// =============================================================================
var watchesCtrl = {
    getSampleProducts: function (req, res) {
        watchesRepo.getSampleProducts(function (result) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : result
            });
        });
    },
    getTotalProducts: function (req, res) {
        var searchtext = req.query.searchtext || '';
        var minPrice = parseInt(req.query.minPrice) || '';
        var maxPrice = parseInt(req.query.maxPrice) || '';
        watchesRepo.getTotalProducts(searchtext, minPrice, maxPrice, function (results) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : results
            });
        });
    },
    getProductDataBySearch: function (req, res) {
        var searchtext = req.query.searchtext || '';
        var orderby = req.query.orderby || '';
        var minPrice = parseInt(req.query.minPrice) || '';
        var maxPrice = parseInt(req.query.maxPrice) || '';
        var page = parseInt(req.query.page) || 1;
        watchesRepo.getProductDataBySearch(searchtext, orderby, minPrice, maxPrice, page, function (results) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : results
            });
        });
    },
    getProductById: function (req, res) {
        var id = req.query.id || '';
        if (id === '') {
            res.status(400);
            res.json({
                "status": 400
            });
        } else {
            watchesRepo.getProductById(id, function (result) {
                res.status(200);
                res.json({
                    'status': 200,
                    'data' : result
                });
            });
        }
    },
    countProductsBySearchText: function (req, res) {
        var searchtext = req.query.searchtext || '';
        watchesRepo.countProductsBySearchText(searchtext, function (result) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : result
            });
        });
    }
};

module.exports = watchesCtrl;