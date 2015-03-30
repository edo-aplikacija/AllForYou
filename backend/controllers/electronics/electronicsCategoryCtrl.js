// LOAD MODULES
// =============================================================================
var rootPath = '../../';
var electronicsCategoryRepo = require(rootPath + 'repositories/electronics/electronicsCategoryRepo');
// PUBLIC METHODS
// =============================================================================
var electronicsCategoryCtrl = {
    getSampleProducts: function (req, res) {
        var id = req.query.id || '';
        var title = req.query.title || '';
        var category = req.query.category || '';
        var subcategory = req.query.subcategory || '';
        electronicsCategoryRepo.getSampleProducts(id, title, category, subcategory, function (result) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : result
            });
        });
    },
    getBrands: function (req, res) {
        var category = req.query.category || '';
        electronicsCategoryRepo.getBrands(category, function (results) {
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
        var subcategory = req.body.subcategory || [];
        var brands = req.body.brands || [];
        var minPrice = parseInt(req.body.minPrice) || '';
        var maxPrice = parseInt(req.body.maxPrice) || '';
        electronicsCategoryRepo.getTotalProducts(searchtext, category, subcategory, brands, minPrice, maxPrice, function (results) {
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
        var subcategory = req.body.subcategory || [];
        var brands = req.body.brands || [];
        var orderby = req.body.orderby || '';
        var minPrice = parseInt(req.body.minPrice) || '';
        var maxPrice = parseInt(req.body.maxPrice) || '';
        var page = parseInt(req.body.page) || 1;
        electronicsCategoryRepo.getProductDataBySearch(searchtext, category, subcategory, brands, orderby, minPrice, maxPrice, page, function (results) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : results
            });
        });
    },
};

module.exports = electronicsCategoryCtrl;