var repl = require('repl');
var ttys = require('ttys');

module.exports = function (argv, input) {
    if (argv.coffee)
        try {
            repl = require('coffee-script/lib/coffee-script/repl');
        } catch (e) {
            console.warn('warn: CoffeeScript not found, using JavaScript');
        }

    var json = [];

    input.on('data', function (data) {
        json.push(JSON.parse(data));
    });

    input.on('end', function () {
        if (json.length === 1)
            json = json[0];
        cli = repl.start({
            input: ttys.stdin,
            output: ttys.stdout,
            prompt: '> '
        });
        cli.context.data = json;
        cli.on('exit', function () {
            ttys.stdin.end();
        });
    });
}
