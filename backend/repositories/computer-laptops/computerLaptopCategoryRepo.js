// NODE PACKAGES
// =============================================================================

// LOAD MODULES
// =============================================================================
var rootPath = '../../';
var computerLaptop = require(rootPath + 'db/models/computers-laptops').computerLaptop;
var computerLaptopBrand = require(rootPath + 'db/models/computers-laptops').computerLaptopBrand;
// PUBLIC METHODS
// =============================================================================
var computerLaptopCategoryRepo = {
    getSampleProducts: function (id, title, category , callback) {
        var query = computerLaptop.find({ '_id': { $ne: id }, '$text': { '$search': title }, 'category': category }).limit(12);
        query.exec(function (err, result) {
            if (err) {
                return callback([]);
            } else {
                return callback(result);
            }
        });
    },
    getBrands: function (category, callback) {
        if (category !== '') {
            var query = computerLaptopBrand.find({ 'category': category } , 'name');
            query.exec(function (err, result) {
                if (err) {
                    return callback([]);
                } else {
                    return callback(result);
                }
            });
        } else {
            return callback([]);
        }
    },
    getTotalProducts: function (searchtext, category, brands, minPrice, maxPrice, callback) {
        var findQuery = {};
        if (searchtext !== '') {
            findQuery['$text'] = { $search: searchtext }
        }
        if (category !== '') {
            findQuery['category'] = category
        }
        if (brands.length > 0) {
            findQuery['brand'] = { '$in': brands }
        }
        if (minPrice !== '' && maxPrice !== '') {
            findQuery['price'] = { '$gte': minPrice, '$lte': maxPrice }
        } else if (maxPrice !== '') {
            findQuery['price'] = { '$lte': maxPrice }
        } else if (minPrice !== '') {
            findQuery['price'] = { '$gte': minPrice }
        }
        
        var query = computerLaptop.find(findQuery).count();
        
        query.exec(function (err, result) {
            if (err) {
                return callback(0);
            } else {
                return callback(result);
            }
        });
    },
    getProductDataBySearch: function (searchtext, category, brands, orderby, minPrice, maxPrice, page, callback) {
        var pageLength = 24;
        var productsToSkip = (page - 1) * pageLength;
        
        var findQuery = {};
        var findScore = {};
        var sortQuery = {};
        if (searchtext !== '') {
            findQuery['$text'] = { $search: searchtext };
            findScore['score'] = { '$meta': 'textScore' };
            sortQuery['score'] = { '$meta': 'textScore' };
        }
        if (category !== '') {
            findQuery['category'] = category
        }
        if (brands.length > 0) {
            findQuery['brand'] = { '$in': brands }
        }
        if (minPrice !== '' && maxPrice !== '') {
            findQuery['price'] = { '$gte': minPrice, '$lte': maxPrice }
        } else if (maxPrice !== '') {
            findQuery['price'] = { '$lte': maxPrice }
        } else if (minPrice !== '') {
            findQuery['price'] = { '$gte': minPrice }
        }
        if (orderby === 'salesrank') {
            sortQuery['salesrank'] = -1;
        } else if (orderby === '-price') {
            sortQuery['price'] = -1;
        } else if (orderby === 'price') {
            sortQuery['price'] = 1;
        }
        var query = computerLaptop.find(findQuery, findScore).sort(sortQuery).limit(pageLength).skip(productsToSkip);
        
        query.exec(function (err, result) {
            if (err) {
                return callback([]);
            } else {
                return callback(result);
            }
        });

    }
};

// PRIVATE METHODS
// =============================================================================
// EXPORT REPO
// =============================================================================
module.exports = computerLaptopCategoryRepo;