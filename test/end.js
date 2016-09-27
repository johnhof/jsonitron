'use strict';

let mocha = require('co-mocha');
let expect = require('chai').expect;

let jsonitron = require('../');

describe('end-to-end', () => {
  it('should initialize successfully', () => {
    let transformer = new jsonitron.Transformer();
  });

  it('should allow transform building', () => {
    let transformer = new jsonitron.Transformer();
    transformer.use(jsonitron.Factory.newUpper('first_name'));
    transformer.use(jsonitron.Factory.newUpper('last_name'));
    transformer.use(jsonitron.Factory.newRename('details.uuid', 'id'));
    transformer.use(jsonitron.Factory.new('details.contacts.*.phone', (s) => {
      match = ((s || '').match(/(\d{3,3})(\d{3,3})(\d{3,3})/) || [])
      match.pop();
      return match.join('-');
    }));
  });

  it('should perform transformation', () => {
    let input = {
      name: { first: 'john', last: 'hofrichter' },
      details: {
        external_id: 'asdfasdf',
        contacts: [ { phone: '1231231234' }, { phone: '2342342345' } ]
      }
    };
    let output = {
      name: { first: 'JOHN', last: 'HOFRICHTER' },
      details: {
        id: 'asdfasdf',
        contacts: [ { phone: '123-123-1234' }, { phone: '234-234-2345' } ]
      }
    };

    let transformer = new jsonitron.Transformer();
    transformer.use(jsonitron.Factory.newUpper('first_name'));
    transformer.use(jsonitron.Factory.newUpper('last_name'));
    transformer.use(jsonitron.Factory.newRename('details.external_id', 'id'));
    transformer.use(jsonitron.Factory.new('details.contacts.*.phone', (v, i) => {
      match = ((v || '').match(/(\d{3,3})(\d{3,3})(\d{3,3})/) || [])
      match.pop();
      return match.join('-');
    }));

    expect(transformer.exec(input));
  });
})
