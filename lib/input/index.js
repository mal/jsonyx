module.exports = function (argv) {
    var mode = argv.lines ? 'stream' : 'buffer',
        type = argv._.length ? 'files' : 'stdin';

    return require('./' + mode + '/' + type)(argv._);
}
