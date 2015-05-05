var fs = require('fs');
var vm = require('vm');

module.exports = function (argv, input) {
    var sandbox = vm.createContext(),
        script = argv.eval;

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

    if (argv.buffer) {
        var buffer = [];
        input.on('data', function (data) {
            buffer.push(JSON.parse(data));
        });
        input.on('end', function () {
            try {
                sandbox.data = buffer;
                console.log(vm.runInContext(script, sandbox));
            } catch (e) {
                console.log('error: ' + e.toString());
            }
        });
    } else {
        input.on('data', function (data) {
            try {
                sandbox.data = JSON.parse(data);
                console.log(vm.runInContext(script, sandbox));
            } catch (e) {
                console.log('error: ' + e.toString());
            }
        });
    }
}
