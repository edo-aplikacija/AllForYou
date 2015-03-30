// LOAD MODULES
// =============================================================================
var rootPath = '../../';
var computersLaptopsCategoryRepo = require(rootPath + 'repositories/computer-laptops/computerLaptopCategoryRepo');
// PUBLIC METHODS
// =============================================================================
var computersLaptopsCategoryCtrl = {
    getSampleProducts: function (req, res) {
        var id = req.query.id || '';
        var title = req.query.title || '';
        var category = req.query.category || '';
        computersLaptopsCategoryRepo.getSampleProducts(id, title, category, function (result) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : result
            });
        });
    },
    getBrands: function (req, res) {
        var category = req.query.category || '';
        computersLaptopsCategoryRepo.getBrands(category, function (results) {
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
        computersLaptopsCategoryRepo.getTotalProducts(searchtext, category, brands, minPrice, maxPrice, function (results) {
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
        computersLaptopsCategoryRepo.getProductDataBySearch(searchtext, category, brands, orderby, minPrice, maxPrice, page, function (results) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : results
            });
        });
    },
};

module.exports = computersLaptopsCategoryCtrl;