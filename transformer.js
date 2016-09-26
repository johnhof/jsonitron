'use strict';

const _ = require('lodash');
const comise = require('comise');

class Transformer {
  constructor (template) {
    this.template = template
    this.tranformations = [];
    this.compile(template);
  }

  compile () {
    let self = this;
    return comise(function *() {
      self.tranformations = _.map(self.template, (v) => return v);
    });
  }

  render () {
    let self = this;
    return comise(function *() {
      for (key of self.tranformations) {

      }
    });
  }
}
