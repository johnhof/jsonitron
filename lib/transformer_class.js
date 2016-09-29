'use strict';

const _ = require('lodash');
const comise = require('comise');
const HELPERS = require('./helpers');

let checkpoint = HELPERS.checkpoint;

class Transformer {
  constructor () {
    this.transforms = [];
  }

  use (transform) {
    this.transforms.push(transform);
  }

  useAll(transforms) {
    checkpoint(_.isArray(transforms), 'Transformer.useAll requires an array');
    _.each(transforms, this.use.bind(this));
  }

  exec (obj) {
    for (let transform of this.transforms) {
      obj = transform.exec(obj);
    }
    return obj;
  }
}

module.exports = Transformer;
