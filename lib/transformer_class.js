'use strict';

const _ = require('lodash');
const comise = require('comise');

class Transformer {
  constructor () {
    this.transforms = [];
  }

  use (transform) {
    this.transforms.push(transform);
  }

  useAll(tranfroms) {
    _.each(transforms || [], this.use);
  }

  exec (obj) {
    for (let transform of this.transforms) {
      obj = transform.exec(obj);
    }
    return obj;
  }
}

module.exports = Transformer;
