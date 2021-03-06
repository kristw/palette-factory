# palette-factory [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> For a given color palette, generate color files for use in different languages and a preview page

## Command-line Usage

Install

```sh
$ npm install -g palette-factory
```

Then

```sh
$ palette-factory input/palette.scss --type js,html --output output/name
```

#### Input (.scss)

The input is a `.scss` file, with a special property that you can use markdown in the comments. However only `// ...` syntax is allowed for comments, not `/* ... */`.

```sass
// # Colors
// ## Test
$blue: #0066ff;
$dark-blue: #0055ff;
$dark-blue2: lighten($dark-blue, 30%);
```

#### Output (.js)

Colors are ready to use as variables in javascript.

```js
export var colors = {
// # Colors
// ## Test
blue: '#0066ff',
darkBlue: '#0055ff',
darkBlue2: '#99bbff',
};
```

#### Output (.html)

A vanilla preview page. You can easily add style to make it looks nicer.

<img src="images/html.png" width="300">


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
