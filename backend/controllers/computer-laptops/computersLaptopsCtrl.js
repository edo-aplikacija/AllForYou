// LOAD MODULES
// =============================================================================
var rootPath = '../../';
var computersLaptopsRepo = require(rootPath + 'repositories/computer-laptops/computerLaptopRepo');
// PUBLIC METHODS
// =============================================================================
var computersLaptopsCtrl = {
    getSampleProducts: function (req, res) {
        computersLaptopsRepo.getSampleProducts(function (result) {
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
        computersLaptopsRepo.getTotalProducts(searchtext, minPrice, maxPrice, function (results) {
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
        computersLaptopsRepo.getProductDataBySearch(searchtext, orderby, minPrice, maxPrice, page, function (results) {
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
            computersLaptopsRepo.getProductById(id, function (result) {
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
        computersLaptopsRepo.countProductsBySearchText(searchtext, function (result) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : result
            });
        });
    }
};

module.exports = computersLaptopsCtrl;