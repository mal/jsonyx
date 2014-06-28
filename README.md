# jsonyx

A lightweight interactive JSON parser/inspector that leverages the full
power of Node.js, or for those that prefer: CoffeeScript.

## Install

It's recommended to install `jsonyx` globally so it can be used from
anywhere.

```
sudo npm install -g jsonyx
```

## Example

Typical usage might look something like this, where the `curl` is
outputting a JSON payload. When the REPL begins the `data` variable
holds the parsed payload.

```
$ curl http://my.json.app/endpoint | jsonyx
> data.map(function (a) { return a.b.c; });
[ 'foo',
  'bar',
  'baz' ]
> 
```

## Usage

```
usage: jsonyx [options] [file]...

  -c, --coffee          use CoffeeScript, if installed
  -e, --eval script     evaluate script, print result
  -h, --help            this message
  -l, --lines           treat each line as a separate JSON document
  -s, --script path     read script from path
```

## Notes

### Line Mode

When using line mode with a REPL, lines will be buffered to an array
which will be available via `data`. This differs slightly from using
line mode with a script, where the script will be run against each line,
and `data` will hold that single parsed line.
