// LOAD MODULES
// =============================================================================
var rootPath = '../../';
var electronicsSubcategoryRepo = require(rootPath + 'repositories/electronics/electronicsSubcategoryRepo');
// PUBLIC METHODS
// =============================================================================
var electronicsSubcategoryCtrl = {
    getSampleProducts: function (req, res) {
        var id = req.query.id || '';
        var title = req.query.title || '';
        var category = req.query.category || '';
        var subcategory = req.query.subcategory || '';
        electronicsSubcategoryRepo.getSampleProducts(id, title, category, subcategory, function (result) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : result
            });
        });
    }
};

module.exports = electronicsSubcategoryCtrl;