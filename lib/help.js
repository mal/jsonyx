var eol = require('os').EOL;

console.warn([
    'usage: jsonyx [options] [file]...',
    '',
    '  -c, --coffee          use CoffeeScript, if installed',
    '  -e, --eval script     evaluate script, print result',
    '  -h, --help            this message',
    '  -l, --lines           treat each line as a separate JSON document',
    '  -s, --script path     read script from path'
].join(eol));

process.exit(1);
