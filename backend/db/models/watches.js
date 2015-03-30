// NODE PACKAGES
// =============================================================================
var mongoose = require('mongoose');

// DATABASE SCHEMA
// =============================================================================
var Schema = mongoose.Schema;
// WATCHES
var Watches = new Schema({
    asin: {
        type: String,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
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
        type: String
    },
    color: {
        type: String
    }
}, { collection: 'watch' });
// WATCHES BRAND
var WatchesBrand = new Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
}, { collection: 'watchbrand' });

var watches = mongoose.model('Watches', Watches);
var watchesBrand = mongoose.model('WatchesBrand', WatchesBrand);

module.exports.watches = watches;
module.exports.watchesBrand = watchesBrand;
