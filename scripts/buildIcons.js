#!/usr/bin/env node --harmony

var glob 	= require('glob');
var SVGSpriter = require('svg-sprite');
var pathUtil = require('path');
var File = require('vinyl');
var fs = require('fs');
var mkdirp = require('mkdirp');
var objectAssign = require('object-assign');
var co = require('co');
var promisify = require('es6-promisify');
var config = require('../config').icons;

var sprites = config.sprites

var defaultOptions = {
  dest: 'icons/images',
  shape: {
    align: 'icons/templates/sprite-alignment.yml',
    transform: []
  },
  mode: {
    css: {
      dest: '.',
      bust: false,
      sprite: 'icons',
      layout: config.layout,
      prefix: '.icon-%s',
      render: {
        scss: {
          template: "icons/templates/sprite-map.hbs",
          dest: ""
        }
      }
    }
  }
};

function resizer(opts) {
  return function(shape, sprite, callback) {
    shape.width = config.width * opts.width;
    shape.height = config.height * opts.height;
    callback(null);
  }
}

function getOptions(name) {
  var options = objectAssign({}, defaultOptions);
  options.variables = { name: name };
  options.shape.transform.push({ resize: resizer(sprites[name]) });
  options.mode.css.sprite = name + '-icons';
  options.mode.css.render.scss.dest = '../../icons/maps/_' + name + 'Icons';
  return options;
}

function * SpriteCompiler(directory) {
  for(var name of Object.keys(sprites)) {
    var spriter = new SVGSpriter(getOptions(name));
    var cwd = directory + '/' + name;
    var files = yield promisify(glob)('**/*.svg', {cwd: cwd})
    files.forEach(function(file) {
      var filePath = pathUtil.join(cwd, file);
      spriter.add(new File({
        path: filePath,
        base: cwd,
        contents: fs.readFileSync(filePath)
      }));
    });

    spriter.compile(function(err, result, data) {
      if(err) {
        console.log(err);
        return;
      }
      for (var type in result.css) {
        mkdirp.sync(pathUtil.dirname(result.css[type].path));
        fs.writeFileSync(result.css[type].path, result.css[type].contents);
      }
    });
  };

};

co(SpriteCompiler(__dirname + '/../icons/images/sprite'));
