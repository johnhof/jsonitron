'use strict';

const _ = require('lodash');
const CASE = require('change-case');
const TRANSFORMS = require('./transforms');
const TRANSFORM = require('./transform');
const HELPERS = require('./helpers');

const KEY_SPACE = ['build', 'create', 'new'];

let checkpoint = HELPERS.checkpoint;

//
// Build a transform object
//
let build = (path, action, params, name) => {
  checkpoint(_.isString(path), 'Transform builder requires `path` to be a string')
    .and(_.isFunction(action), 'Transform builder requires `action` to be a function');

  let transform = new TRANSFORM({ params: params, name: name });
  transform.setPath(path);
  transform.setAction(action);
  return transform;
}
_.each(KEY_SPACE, (val) => module.exports[val] = build);

//
// Register a transform builder
//
module.exports.register = (name, action) => {
  checkpoint(_.isString(name), `Transform registration expects 'key' to be a string`)
    .and(_.isFunction(action), `Transform registration [${name}] expects 'action' to be a function`)
    .and(!module.exports[name], `Key collision trying to register tranform [${name}]`);

  let transformBuilder = (path, params) => {
    return module.exports.build(path, action, params, name);
  }

  module.exports[name] = transformBuilder;

  for (let k of KEY_SPACE) {
    let key = k + CASE.pascalCase(name);
    checkpoint(!module.exports[key], `Key collision trying to register tranform [${key}]`);
    module.exports[key] = transformBuilder;
  }
}

//
// Register all predefined transforms
//
for (let tKey of Object.keys(TRANSFORMS)) {
  module.exports.register(tKey, TRANSFORMS[tKey]);
}
