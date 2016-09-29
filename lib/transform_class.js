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

    let paths = HELPERS.findMatchingPaths(this.path, object);
    _.each(paths, (path) => {
      let val = _.get(object, path);
      let key = HELPERS.findLastPropertyKey(path);

      let updatedKey = key;
      let updatedVal = val;
      this.action.call({
        setKey: (k) => updatedKey = k,
        setVal: (v) => updatedVal = v,
        setValue: (v) => updatedVal = v,
        value: updatedVal,
        key: updatedKey
      }, val, key, this.params);

      // Handle a key change
      if (updatedKey && updatedKey !== key) {
        let newPath = path.replace(new RegExp(key + '$'), updatedKey);
        _.unset(object, path);
        _.setWith(object, newPath, updatedVal);
        val = updatedVal; // prevent a second update
      }

      // handle a value change
      if (updatedVal !== val) {
        _.setWith(object, path, updatedVal);
      }
    });

    return object;
  }
}

module.exports = Transform;
