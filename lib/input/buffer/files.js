var EventEmitter = require('events').EventEmitter;
var fs = require('fs');

module.exports = function (files) {
    var ee = new EventEmitter,
        expect = files.length;

    files.forEach(function (file) {
        fs.readFile(file, function (err, data) {
            if (err) return ee.emit('error', err);
            ee.emit('data', data);
            if (!--expect) ee.emit('end');
        });
    });

    return ee;
}
