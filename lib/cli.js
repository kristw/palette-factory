#!/usr/bin/env node
'use strict';
const meow = require('meow');
import * as fs from 'fs';
import * as paletteFactory from './index';

const cli = meow([
  'Usage',
  '  $ palette-factory [input]',
  '',
  'Options',
  '  --foo  Lorem ipsum. [Default: false]',
  '',
  'Examples',
  '  $ palette-factory',
  '  unicorns',
  '  $ palette-factory rainbows',
  '  unicorns & rainbows'
]);

var rows = paletteFactory.compileFile(process.cwd() + '/' + cli.input);

var types = ['js'];
if(cli.flags.type){
  types = cli.flags.type.split(',');
}

var outputPath = cli.flags.output || 'output/palette';
outputPath = process.cwd() + '/' + outputPath;

types.forEach(function(type){
  var output;
  switch(type){
    case 'json':
      output = paletteFactory.toJson(rows);
      break;
    case 'md':
      output = paletteFactory.toMd(rows);
      break;
    case 'html':
      output = paletteFactory.toHtml(rows);
      break;
    case 'js':
      output = paletteFactory.toJs(rows);
      break;
    default:
      console.log('type: '+type+' is not supported');
      return;
  }
  var path = outputPath+'.'+type;
  fs.writeFileSync(path, output);
  console.log('output written to ' + path);
});