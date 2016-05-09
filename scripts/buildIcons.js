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

var defaultSize = 12;
var sprites = {
  default: { width: 1, height: 1 },
  large: { width: 1.5, height: 1.5 },
  social: { width: 2, height: 2 }
};
var mapDest = "../../icons/revamped/";

function resizer(opts) {
  return function(shape, sprite, callback) {
    shape.width = defaultSize * opts.width;
    shape.height = defaultSize * opts.height;
    callback(null);
  }
}

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
      layout: 'horizontal',
      prefix: '.revamped-icon-%s',
      render: {
        scss: {
          template: "icons/templates/sprite-map.hbs",
          dest: ""
        }
      }
    }
  }
};

function * SpriteCompiler(directory) {
  for(var name of Object.keys(sprites)) {

    var cwd = directory + '/' + name;

    var files = yield promisify(glob)('**/*.svg', {cwd: cwd})

    var options = objectAssign({}, defaultOptions);
    options.variables = { name: name };
    options.shape.transform.push({ resize: resizer(sprites[name]) });
    options.mode.css.sprite = name + '-icons';
    options.mode.css.render.scss.dest = mapDest + '_' + name + 'IconMap';

    var spriter = new SVGSpriter(options);

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

module.exports = SpriteCompiler;
