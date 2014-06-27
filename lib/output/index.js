module.exports = function (argv, input) {
    var type = argv.eval || argv.script ? 'vm' : 'repl';
    require('./' + type)(argv, input);
}
