'use strict';

const _ = require('lodash');
const HELPERS = require('./helpers');

let checkpoint = HELPERS.checkpoint;

class Transform {
  constructor (config) {
    config = config || {};
    this.name =  config.name || 'Anonymous Transform';
    this.path = config.path;
    this.action = config.action;
    this.params = config.params || {};
  }

  setPath (path) {
    this.path = path;
  }

  setName (name) {
    this.name = name;
  }

  setAction (action) {
    this.action = action;
  }

  exec (object) {
    checkpoint(_.isString(this.path), 'Path match was never set for tranform').
      and(_.isFunction(this.action), this.action, 'Action handler was never set for tranform');

    paths = HELPERS.findMatchingPaths(this.path, object);

    return object;
  }
}

module.exports = Transform;
