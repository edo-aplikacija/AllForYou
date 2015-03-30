// NODE PACKAGES
// =============================================================================
var mongoose = require('mongoose');

// DATABASE SCHEMA
// =============================================================================
var Schema = mongoose.Schema;
// ELECTRONIC
var Electronic = new Schema({
    asin: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    oldprice: {
        type: Number,
    },
    dateAdded: {
        type: Date
    },
    images: [
        {
        type: String,
        required: true
        }
    ],
    producturl: {
        type: String,
        required: true
    },
    reviewsurl: {
        type: String,
    },
    salesrank: {
        type: Number,
    },
    editorialreviews: [
        {
            type: String,
        }
    ],
    features: [
        {
            type: String,
        }
    ],
    model: {
        type: String,
    },
    color: {
        type: String
    },
    operatingsystem: {
        type: String
    }
}, { collection: 'electronic'});
// ELECTRONIC BRAND
var ElectronicBrand = new Schema({
    name: {
        type: String,
    },
    category: {
        type: String,
    }
}, { collection: 'electronicbrand' });




var electronic = mongoose.model('Electronic', Electronic);
var electronicBrand = mongoose.model('ElectronicBrand', ElectronicBrand);

module.exports.electronic = electronic;
module.exports.electronicBrand = electronicBrand;
