'use strict';

const mocha = require('co-mocha');
const expect = require('chai').expect;
const _ = require('lodash');

const HELPERS = require('../helpers');

describe('Helpers', () => {
  describe('findMatchingPaths', () => {
    it('build all paths that match the generic path', () => {
      let path = 'foo.fuzz.*.bar.*.biz';
      let obj = {
        foo: {
          fuzz: [{
            bar: {
              one: { biz: 'test1' },
              two: { biz: 'test2' },
              three: { biz: 'test2' },
            },
          }, {
            bar: {
              one: { biz: 'test1'},
              two: { biz: 'test2' },
              three: { biz: 'test2' },
            },
          }, {
            bar: {
              one: { biz: 'test1' },
              two: { biz: 'test2' },
              three: { biz: 'test2' },
            },
          }],
          fazz: { baz: 'nope' }
        },
      };

      let expected = [
        'foo.fuzz[0].bar.one.biz',
        'foo.fuzz[0].bar.two.biz',
        'foo.fuzz[0].bar.three.biz',
        'foo.fuzz[1].bar.one.biz',
        'foo.fuzz[1].bar.two.biz',
        'foo.fuzz[1].bar.three.biz',
        'foo.fuzz[2].bar.one.biz',
        'foo.fuzz[2].bar.two.biz',
        'foo.fuzz[2].bar.three.biz',
      ];

      let result = HELPERS.findMatchingPaths(path, obj);
      let map = {};
      _.each(result, (match) => map[match] = 1);
      _.each(expected, (str) => {
        expect(map[str]).to.equal(1);
      });
    });
  });
});
