'use strict';

const _ = require('lodash');
const CASE = require('change-case');
const TRANSFORMATIONS = require('./tranformations');
const KEY_SPACE = ['build', 'create', 'new'];

module.exports.build = (path, action) => {

}

module.exports.register = (name, action) => {
  checkpoint(_.isString(name), `Transform registration expects 'key' to be a string`)
    .and(_.isFunction(action), `Transform registration [${name}] expects 'action' to be a function`);

  for (let k of KEY_SPACE) {
    let key = k + CASE.pascalCase(name);
    checkpoint(module.exports[key], `Key collision trying to register tranform [${key}]`);
    module.exports[key] = action;
  }
}

for (let transform of TRANSFORMATIONS) {
  module.exports.register(transform);
}

console.log(Object.keys(module.exports));
