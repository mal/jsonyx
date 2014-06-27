var EventEmitter = require('events').EventEmitter;
var base = require('./base');
var fs = require('fs');

function next(ee, files) {
    var file = files.shift();

    if (!file) return ee.emit('end');

    var stream = base(fs.createReadStream(file));

    stream.on('data', function (data) {
        ee.emit('data', data);
    });

    stream.on('end', function () {
        process.nextTick(function () {
            next(ee, files);
        });
    });

    stream.on('error', function (err) {
        ee.emit('error', err);
    });
}

module.exports = function (files) {
    var ee = new EventEmitter;

    process.nextTick(function () {
        next(ee, files);
    });

    return ee;
}
