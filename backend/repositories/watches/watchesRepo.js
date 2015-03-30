// NODE PACKAGES
// =============================================================================

// LOAD MODULES
// =============================================================================
var rootPath = '../../';
var watches = require(rootPath + 'db/models/watches').watches;
var watchesBrand = require(rootPath + 'db/models/watches').watchesBrand;
// PUBLIC METHODS
// =============================================================================
var watchesRepo = {
    getSampleProducts: function (callback) {
        var query = watches.find().limit(8);
        query.exec(function (err, result) {
            if (err) {
                return callback([]);
            } else {
                return callback(result);
            }
        });
    },
    getTotalProducts: function (searchtext, minPrice, maxPrice, callback) {
        var findQuery = {};
        if (searchtext !== '') {
            findQuery['$text'] = { $search: searchtext }
        }
        if (minPrice !== '' && maxPrice !== '') {
            findQuery['price'] = { '$gte': minPrice, '$lte': maxPrice }
        } else if (maxPrice !== '') {
            findQuery['price'] = { '$lte': maxPrice }
        } else if (minPrice !== '') {
            findQuery['price'] = { '$gte': minPrice }
        }
        
        var query = watches.find(findQuery).count();
        
        query.exec(function (err, result) {
            if (err) {
                return callback(0);
            } else {
                return callback(result);
            }
        });
    },
    getProductDataBySearch: function (searchtext, orderby, minPrice, maxPrice, page, callback) {
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
        var query = watches.find(findQuery, findScore).sort(sortQuery).limit(pageLength).skip(productsToSkip);
        
        query.exec(function (err, result) {
            if (err) {
                return callback([]);
            } else {
                return callback(result);
            }
        });

    },
    getProductById: function (id, callback) {
        var query = watches.find({ '_id': id }).limit(1);
        query.exec(function (err, result) {
            if (err) {
                return callback([]);
            } else {
                return callback(result);
            }
        });
    },
    countProductsBySearchText: function (searchtext, callback) {
        var query = watches.find({ '$text': { $search: searchtext } }).count();
        query.exec(function (err, result) {
            if (err) {
                return callback(0);
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
module.exports = watchesRepo;