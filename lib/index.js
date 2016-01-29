'use strict';

import * as fs from 'fs';
import * as _ from 'lodash';
import * as sass from 'node-sass';
var marked = require('marked');

function parseVariable(name, scss){
  var result = sass.renderSync({
    data: scss + '\nx{ color: '+ name +'; }',
    outputStyle: 'compact'
  });
  var css = result.css.toString();
  return css.substring(10, css.length-4).trim();
}

function notEmpty(d){
  return d.value!==null && d.value!==undefined && d.value.trim().length>0;
}

function camelCaseName(row){
  return _.camelCase(row.name.substring(1));
}

function kebabCaseName(row){
  return _.kebabCase(row.name.substring(1));
}

var cleanComment = /\/\/\/*[ ]*/g;

export function compileFile(filename){
  return compileText(fs.readFileSync(filename, 'utf-8'));
}

export function compileText(scssContent){
  var rows = scssContent.split('\n')
    .map(function(value, index){
      return {
        value,
        line: index+1
      };
    })
    .filter(notEmpty)
    .map(function(row){
      var isComment = row.value.substring(0,2)==='//';
      if(isComment){
        return {
          isComment,
          value: row.value.replace(cleanComment, '')
        };
      }
      else{
        var name = row.value.split(':')[0].trim();
        try{
          var value = parseVariable(name, scssContent);
          return {
            isComment,
            name,
            value
          };
        }
        catch(ex){
          throw '[Error] line '+ row.line + ' >> ' + ex;
        }
      }
    })
    .filter(notEmpty);

  return rows;
}

export function toJs(rows){
  var processedRows = rows.map(function(row){
    if(row.isComment){
      return '// '+row.value;
    }
    else{
      return camelCaseName(row) + ': \'' + row.value + '\',';
    }
  });

  return ['export var colors = {'].concat(processedRows).concat(['};']).join('\n');
}

export function toJson(rows){
  var obj = rows
    .filter(function(d){return !d.isComment;})
    .reduce(function(prev, current){
      prev[camelCaseName(current)] = current.value;
      return prev;
    }, {});

  return JSON.stringify(obj, null, 2);
}

export function toMd(rows){
  return rows.map(function(row){
    if(row.isComment){
      return row.value + '\n';
    }
    else{
      return `<div class="palette" style="display:inline-block;padding:5px 10px;text-align:center;">
<div style="display:inline-block;padding:3px;width:60px;height:60px;margin-bottom: 5px; border:1px solid #ddd;">
<div style="background-color:${row.value};width:60px;height:60px"></div></div>
<div><b>${kebabCaseName(row)}</b></div>
<div><code>${row.value}</code></div>
</div>\n`;
    }
  }).join('\n');
}

export function toHtml(rows){
  marked.setOptions({});
  return marked(toMd(rows));
}
