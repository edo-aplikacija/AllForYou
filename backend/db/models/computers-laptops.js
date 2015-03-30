// NODE PACKAGES
// =============================================================================
var mongoose = require('mongoose');

// DATABASE SCHEMA
// =============================================================================
var Schema = mongoose.Schema;
// COMPUTER LAPTOP
var ComputerLaptop = new Schema({
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
    },
    operatingsystem: {
        type: String
    },
}, { collection: 'computerlaptop' });
// COMPUTER LAPTOP BRAND
var ComputerLaptopBrand = new Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
}, { collection: 'computerlaptopbrand' });

var computerLaptop = mongoose.model('ComputerLaptop', ComputerLaptop);
var computerLaptopBrand = mongoose.model('ComputerLaptopBrand', ComputerLaptopBrand);

module.exports.computerLaptop = computerLaptop;
module.exports.computerLaptopBrand = computerLaptopBrand;
