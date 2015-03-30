// NODE PACKAGES
// =============================================================================
var express = require('express');
var app = express();
// LOAD MODULES
// =============================================================================
var rootPath = '../';
// CONTROLLERS
// =============================================================================
// ELECTRONICS
var electronicsCtrl = require(rootPath + 'controllers/electronics/electronicsCtrl');
var electronicsCategoryCtrl = require(rootPath + 'controllers/electronics/electronicsCategoryCtrl');
var electronicsSubcategoryCtrl = require(rootPath + 'controllers/electronics/electronicsSubcategoryCtrl');
// =============================================================================
// COMPUTERS LAPTOPS
var computersLaptopsCtrl = require(rootPath + 'controllers/computer-laptops/computersLaptopsCtrl');
var computersLaptopsCategoryCtrl = require(rootPath + 'controllers/computer-laptops/computersLaptopsCategoryCtrl');
// =============================================================================
// WATCHES
var watchesCtrl = require(rootPath + 'controllers/watches/watchesCtrl');
var watchesCategoryCtrl = require(rootPath + 'controllers/watches/watchesCategoryCtrl');
// =============================================================================


// ROUTES FOR OUR API
// =============================================================================
// (accessed at http://localhost:8080/api)
var router = express.Router();
router.get('/', function (req, res) {
    res.json({ message: 'This is api' });
});
// PUBLIC
// =============================================================================
app.use('/', router);
// =============================================================================
// ELECTRONICS
// =============================================================================
app.get('/electronics/sample-products', electronicsCtrl.getSampleProducts);
app.get('/electronics/search-total-products', electronicsCtrl.getTotalProducts);
app.get('/electronics/search-products', electronicsCtrl.getProductDataBySearch);
// ELECTRONICS CATEGORY
app.get('/electronics-category/sample-products', electronicsCategoryCtrl.getSampleProducts);
app.get('/electronics-category/search-brands', electronicsCategoryCtrl.getBrands);
app.post('/electronics-category/search-total-products', electronicsCategoryCtrl.getTotalProducts);
app.post('/electronics-category/search-products', electronicsCategoryCtrl.getProductDataBySearch);
// ELECTRONICS SUBCATEGORY
app.get('/electronics-subcategory/sample-products', electronicsSubcategoryCtrl.getSampleProducts);
// ELECTRONICS PRODUCT
app.get('/electronics-product', electronicsCtrl.getProductById);
// ELECTRONICS HEADER SEARCH
app.get('/electronics-count', electronicsCtrl.countProductsBySearchText);
// =============================================================================
// COMPUTERS LAPTOPS
// =============================================================================
app.get('/computers-laptops/sample-products', computersLaptopsCtrl.getSampleProducts);
app.get('/computers-laptops/search-total-products', computersLaptopsCtrl.getTotalProducts);
app.get('/computers-laptops/search-products', computersLaptopsCtrl.getProductDataBySearch);
// COMPUTERS LAPTOPS CATEGORY
app.get('/computers-laptops-category/sample-products', computersLaptopsCategoryCtrl.getSampleProducts);
app.get('/computers-laptops-category/search-brands', computersLaptopsCategoryCtrl.getBrands);
app.post('/computers-laptops-category/search-total-products', computersLaptopsCategoryCtrl.getTotalProducts);
app.post('/computers-laptops-category/search-products', computersLaptopsCategoryCtrl.getProductDataBySearch);
// COMPUTERS LAPTOPS PRODUCT
app.get('/computers-laptops-product', computersLaptopsCtrl.getProductById);
// COMPUTERS LAPTOPS HEADER SEARCH
app.get('/computers-laptops-count', computersLaptopsCtrl.countProductsBySearchText);
// =============================================================================
// WATCHES
// =============================================================================
app.get('/watches/sample-products', watchesCtrl.getSampleProducts);
app.get('/watches/search-total-products', watchesCtrl.getTotalProducts);
app.get('/watches/search-products', watchesCtrl.getProductDataBySearch);
// WATCHES CATEGORY
app.get('/watches-category/sample-products', watchesCategoryCtrl.getSampleProducts);
app.get('/watches-category/search-brands', watchesCategoryCtrl.getBrands);
app.post('/watches-category/search-total-products', watchesCategoryCtrl.getTotalProducts);
app.post('/watches-category/search-products', watchesCategoryCtrl.getProductDataBySearch);
// WATCHES PRODUCT
app.get('/watches-product', watchesCtrl.getProductById);
// WATCHES HEADER SEARCH
app.get('/watches-count', watchesCtrl.countProductsBySearchText);
// =============================================================================

// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


module.exports = app;