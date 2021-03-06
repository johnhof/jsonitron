'use strict';

let jsonitron = require('../index');

let TransformFactory = jsonitron.Factory;
let Transformer = jsonitron.Transformer;
let transformer = new Transformer();
transformer.use(TransformFactory.upperCase('name.first'));
transformer.use(TransformFactory.upperCase('name.last'));
transformer.use(TransformFactory.renameKey('user_details.uuid', 'id'));
transformer.use(TransformFactory.renameKey('user_details.contacts.*.uuid', 'id'));
transformer.use(TransformFactory.camelCaseKey('user_details'));
transformer.use(TransformFactory.new('user_details.contacts.*.phone', function (val, key) {
  let match = ((val || '').match(/(^\d{3,3})(\d{3,3})(\d{4,4})$/) || [])
  match.shift();
  this.setVal(match.join('-'));
}));

let result = transformer.exec({
  name: {
    first: 'john',
    last: 'hof'
  },
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
});

console.log(JSON.stringify(result, null, '  '));
// => {
//   name: { first: 'JOHN', last: 'HOF' },
//   userDetails: {
//     id: 'asdfasdf',
//     contacts: [{
//       id: 'asdf',
//       phone: '123-123-1234'
//     }, {
//       id: 'fdsa',
//       phone: '234-234-2345'
//     }]
//   }
// }
