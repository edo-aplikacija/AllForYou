// LOAD MODULES
// =============================================================================
var rootPath = '../../';
var electronicRepo = require(rootPath + 'repositories/electronics/electronicRepo');
// PUBLIC METHODS
// =============================================================================
var electronicsCtrl = {
    getSampleProducts: function (req, res) {
        electronicRepo.getSampleProducts(function (result) {
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
        electronicRepo.getTotalProducts(searchtext, minPrice, maxPrice, function (results) {
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
        electronicRepo.getProductDataBySearch(searchtext, orderby, minPrice, maxPrice, page, function (results) {
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
            electronicRepo.getProductById(id, function (result) {
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
        electronicRepo.countProductsBySearchText(searchtext, function (result) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : result
            });
        });
    }
};

module.exports = electronicsCtrl;