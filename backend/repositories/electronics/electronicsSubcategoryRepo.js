// NODE PACKAGES
// =============================================================================

// LOAD MODULES
// =============================================================================
var rootPath = '../../';
var electronic = require(rootPath + 'db/models/electronics').electronic;
var electronicBrand = require(rootPath + 'db/models/electronics').electronicBrand;
// PUBLIC METHODS
// =============================================================================
var electronicSubcategoryRepo = {
    getSampleProducts: function (id, title, category ,subcategory, callback) {
        var query = electronic.find({'_id': { $ne: id }, '$text': { '$search': title }, 'category': category, 'subcategory': subcategory}).limit(6);
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
module.exports = electronicSubcategoryRepo;