var fs = require('fs');
var vm = require('vm');

module.exports = function (argv, input) {
    var script = argv.eval;

    if (argv.script)
        try {
            script = fs.readFileSync(argv.script, 'utf8');
        } catch (e) {
            console.error('error: unable to load ' + argv.script);
            process.exit(1);
        }

    if (argv.coffee) {
        try {
            script = require('coffee-script').compile(script, { bare: true });
        } catch (e) {
            if (e.code === 'MODULE_NOT_FOUND')
                console.error('error: unable to load CoffeeScript');
            else
                console.error('error: ' + e.toString());
            process.exit(1);
        }
    }

    input.on('data', function (data) {
        try {
            console.log(vm.runInNewContext(script, {
                data: JSON.parse(data)
            }));
        } catch (e) {
            console.log('error: ' + e.toString());
        }
    });
}
