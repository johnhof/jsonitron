'use strict';

let mocha = require('co-mocha');
let expect = require('chai').expect;

let jsonitron = require('../');

describe('smoke', () => {
  it('should initialize successfully', () => {
    let transformer = new jsonitron.Transformer();
  });

  it('should allow transform building', () => {
    let transformer = new jsonitron.Transformer();
    transformer.use(jsonitron.Factory.newUpperCase('name.first'));
    transformer.use(jsonitron.Factory.newUpperCase('name.last'));
    transformer.use(jsonitron.Factory.newRenameKey('details.uuid', 'id'));
    transformer.use(jsonitron.Factory.new('details.contacts.*.phone', (s) => {
      match = ((s || '').match(/(\d{3,3})(\d{3,3})(\d{3,3})/) || [])
      match.pop();
      return match.join('-');
    }));
  });

  it('should perform transformation', () => {
    let input = {
      name: { first: 'john', last: 'hof' },
      user_details: {
        uuid: 'asdfasdf',
        contacts: [{
          uuid: 'asdf',
          phone: '1231231234'
        }, {
          uuid: 'fdsa',
          phone: '2342342345'
        }]
      }
    };
    let output = {
      name: { first: 'JOHN', last: 'HOF' },
      userDetails: {
        id: 'asdfasdf',
        contacts: [{
          id: 'asdf',
          phone: '123-123-1234'
        }, {
          id: 'fdsa',
          phone: '234-234-2345'
        }]
      }
    };

    let transformer = new jsonitron.Transformer();
    transformer.use(jsonitron.Factory.upperCase('name.first'));
    transformer.use(jsonitron.Factory.upperCase('name.last'));
    transformer.use(jsonitron.Factory.renameKey('user_details.uuid', 'id'));
    transformer.use(jsonitron.Factory.renameKey('user_details.contacts.*.uuid', 'id'));
    transformer.use(jsonitron.Factory.new('user_details.contacts.*.phone', function (v, i) {
    transformer.use(jsonitron.Factory.camelCaseKey('user_details'));
      let match = ((v || '').match(/(^\d{3,3})(\d{3,3})(\d{4,4})$/) || [])
      match.shift();
      this.setVal(match.join('-'));
    }));
    let result = transformer.exec(input);
    expect(result).to.deep.equal(output);
  });
})
