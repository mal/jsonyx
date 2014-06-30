var EventEmitter = require('events').EventEmitter;
var eol = require('os').EOL;

module.exports = function (stream) {
    var ee = new EventEmitter,
        data = '';

    stream.setEncoding('utf8');

    stream.on('data', function (chunk) {
        data += chunk;

        var items = data.split(eol);
        data = items.pop();

        items.forEach(function (item) {
            ee.emit('data', item);
        });
    });

    stream.on('end', function () {
        if (data) ee.emit('data', data);
        ee.emit('end');
    });

    stream.on('error', function (err) {
        ee.emit('error', err);
    });

    return ee;
}
