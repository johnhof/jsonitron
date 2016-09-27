'use strict';

const _ = require('lodash');
const comise = require('comise');

class Transformer {
  constructor (template) {
    this.tranformations = [];
  }

  use (transform) {
    this.tranformations.push(transform);
  }

  exec (obj) {
    for (transform of this.transformations) {
      obj = transform.exec(obj);
    }
    return obj;
  }
}

module.exports = Transformer;
