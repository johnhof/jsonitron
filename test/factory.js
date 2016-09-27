'use strict';

const mocha = require('co-mocha');
const expect = require('chai').expect;
const _ = require('lodash');

const SPECIAL_PROPS = ['build', 'new', 'create', 'register'];
const SPECIAL_PROP_FILTER = new RegExp('^(' + SPECIAL_PROPS.join('|') + ')$', 'i');

let jsonitron = require('../');

describe('Factory', () => {
  describe('predefined', () => {
    it('should have export a set of predefined transform builders', () => {
      _.each(jsonitron.Factory, (builder, name) => {
        expect(name).to.be.a('string');
        expect(builder).to.be.a('function');
      });
    });
    it('should have all transform builders return a transform object', () => {
      _.each(jsonitron.Factory, (builder, name) => {
        if (SPECIAL_PROP_FILTER.test(name)) return;
        let transform = builder(name);
        expect(transform).instanceOf(jsonitron.Transform);
      });
    });
  });
});
