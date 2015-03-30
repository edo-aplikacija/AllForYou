var mongoose = require('mongoose');

var mongodbURL = 'mongodb://localhost/amazonsite-db';
var mongodbOptions = {};

var mongodb = {
    startConnection: function () {
        mongoose.connect(mongodbURL, mongodbOptions, function (err, res) {
            if (err) {
                console.log('Connection refused to ' + mongodbURL);
                console.log(err);
            } else {
                console.log('Connection successful to: ' + mongodbURL);
            }
        });
    },
    closeConnection: function () {
        mongoose.disconnect();
    }
};

module.exports = mongodb;