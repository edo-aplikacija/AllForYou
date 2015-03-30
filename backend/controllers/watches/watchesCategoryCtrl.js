// LOAD MODULES
// =============================================================================
var rootPath = '../../';
var watchesCategoryRepo = require(rootPath + 'repositories/watches/watchesCategoryRepo');
// PUBLIC METHODS
// =============================================================================
var watchesCategoryCtrl = {
    getSampleProducts: function (req, res) {
        var id = req.query.id || '';
        var title = req.query.title || '';
        var category = req.query.category || '';
        watchesCategoryRepo.getSampleProducts(id, title, category, function (result) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : result
            });
        });
    },
    getBrands: function (req, res) {
        var category = req.query.category || '';
        watchesCategoryRepo.getBrands(category, function (results) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : results
            });
        });
    },
    getTotalProducts: function (req, res) {
        var searchtext = req.body.searchtext || '';
        var category = req.body.category || '';
        var brands = req.body.brands || [];
        var minPrice = parseInt(req.body.minPrice) || '';
        var maxPrice = parseInt(req.body.maxPrice) || '';
        watchesCategoryRepo.getTotalProducts(searchtext, category, brands, minPrice, maxPrice, function (results) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : results
            });
        });
    },
    getProductDataBySearch: function (req, res) {
        var searchtext = req.body.searchtext || '';
        var category = req.body.category || '';
        var brands = req.body.brands || [];
        var orderby = req.body.orderby || '';
        var minPrice = parseInt(req.body.minPrice) || '';
        var maxPrice = parseInt(req.body.maxPrice) || '';
        var page = parseInt(req.body.page) || 1;
        watchesCategoryRepo.getProductDataBySearch(searchtext, category, brands, orderby, minPrice, maxPrice, page, function (results) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : results
            });
        });
    },
};

module.exports = watchesCategoryCtrl;