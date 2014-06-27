var EventEmitter = require('events').EventEmitter;

module.exports = function () {
    var ee = new EventEmitter,
        data = '';

    process.stdin.on('data', function (chunk) {
        data += chunk;
    });

    process.stdin.on('end', function () {
        ee.emit('data', data);
        ee.emit('end');
    });

    return ee;
}
