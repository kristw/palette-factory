# palette-factory [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> For a given color palette, generate color files for use in different languages and a preview page

## Command-line Usage

Install

```sh
$ npm install -g palette-factory
```

Then

```sh
$ palette-factory input/palette.scss --type js,md,html --output output/palette
```

## Library Usage

```sh
$ npm install --save palette-factory
```

```js
var paletteFactory = require('palette-factory');
```

## License

Apache-2.0 © [Krist Wongsuphasawat](http://kristw.yellowpigz.com)


[npm-image]: https://badge.fury.io/js/palette-factory.svg
[npm-url]: https://npmjs.org/package/palette-factory
[travis-image]: https://travis-ci.org/kristw/palette-factory.svg?branch=master
[travis-url]: https://travis-ci.org/kristw/palette-factory
[daviddm-image]: https://david-dm.org/kristw/palette-factory.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/kristw/palette-factory
[coveralls-image]: https://coveralls.io/repos/kristw/palette-factory/badge.svg
[coveralls-url]: https://coveralls.io/r/kristw/palette-factory
