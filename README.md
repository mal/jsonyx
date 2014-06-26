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

## Extra

  - Prefer CoffeeScript? Use `-c` or `--coffee` to use the coffee REPL
  - Got a JSON log? Use `-l` or `--lines` to parse each line
    individually
