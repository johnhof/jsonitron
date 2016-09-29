# JSONitron

[![Build Status](https://travis-ci.org/johnhof/jsonitron.svg?branch=master)](https://travis-ci.org/johnhof/jsonitron)

JSON transformer for use in data hygene and proxy

## Usage

```javascript
let jsonitron = require('jsonitron');

let userTransformer = new jsonitron.Transformer();
userTransformer.use(jsonitron.Factory.renameKey('name', 'full_name'));
userTransformer.use(jsonitron.Factory.upperCase('full_name'));
userTransformer.use(jsonitron.Factory.upperCase('friends.*.name.first'));
userTransformer.use(jsonitron.Factory.upperCase('friends.*.name.last'));
userTransformer.use(jsonitron.Factory.new('friends.*.phone', function (val, key) {
  let match = ((val || '').match(/(^\d{3,3})(\d{3,3})(\d{4,4})$/) || [])
  match.shift();
  this.setVal(match.join('-'));
}));

let result = userTransformer.exec({
  name: 'john hof',
  friends: [{
    phone: '1232341234',
    name: {
      first: 'joe',
      last: 'smith'
    }
  }, {
    phone: '2342342345',
    name: {
      first: 'jenny',
      last: 'doe'
    }
  }]
});

console.log(result);
// => {
//   full_name: 'JOHN HOF',
//   friends: [{
//     phone: '123-234-1234',
//     name: {
//       first: 'JOE',
//       last: 'SMITH'
//     }
//   }, {
//     phone: '234-234-2345',
//     name: {
//       first: 'JENNY',
//       last: 'DOE'
//     }
//   }]
// }
```

## Key

- [Usage](#usage)
- [Transform](#transform)
  - [Constructor](#transform-constructor)
  - [.setPath](#setpath)
  - [.setName](#setname)
  - [.setAction](#setaction)
  - [.exec](#exec-transform)
- [Transform Factory](#transform-factory)
  - [.build](#build)
  - [.register](#register)
  - [Predefined](#predefined)
- [Transformer](#transformer)
  - [Constructor](#transformer-constructor)
  - [.use](#use)
  - [.useAll](#useAll)
  - [.exec](#exec-transformer)

## Transform

Class for creating a reusable transformation

### Transform Constructor

- Returns a new Transform object
- Accepts: `Object` [optional]
  - `config.name` (`String`) - Name of the transform
  - `config.path` (`String`) - Path to match and perform the action
  - `config.params`: (`Mixed`) -  Params to be passed to the action in addition to `key` and `value`
  - `config.action` (`Function`) - Action to be performed

```javascript
// EXAMPLE ACTION:
//  { user_details.name: 'john hof' }
//       becomes
//  { user_details.full_name: 'JOHN HOF' }
let fooTransform = new jsonitron.Transfrom({
  name: 'foo',
  path: 'user_details.name',
  params: 'foo',
  action: function (value, key, params) {
    this.setVal(value.toUpperCase()); // OR .setValue
    this.setkey('full_name');
  }
});
```

### .setPath

- Set the path on which to perform the action
- Accepts: `String`
  - Expects: JSON syntax: `prop.subProps[0].foo`
  - Allows: `*` as a wildcard: `prop.subProps.*.foo`

```javascript
fooTransform.setPath(`prop.subProps.*.foo`);
// Applies to all elements in subProps:
//   {
//     prop: {
//       subProps: [
//         { foo: 'bar' }
//         { foo: 'baz' }
//       ]
//     }
//   }
//
// AND
//   {
//     prop: {
//       subProps: {
//         biz: { foo: 'bar' }
//         faz: { foo: 'baz' }
//       }
//     }
//   }
```

### .setName

- Set the name of the transform
- Accepts: `String`

```javascript
fooTransform.setName('fooRenamed');
```

### .setAction

- Set the action to be performed
- Accepts: `Function`
  - Should accept: `(value, key, params)` [READ ONLY]
  - `this` - refers to:
    - `this.setKey('String')` - update the key name of the property  
    - `this.setValue` - update the value of the propery
    - `this.setVal` - see `this.setValue`

```javascript
fooTransform.setAction(function (value, key, params) {
  this.setVal(value.toUpperCase()); // OR .setValue
  this.setkey('full_name');
});
```

### .exec transform

- Execute the transform on an object
- Accepts: `Object`
- Returns: (`Object`) result of the transform

```javascript
let result = fooTransform.exec({ object: { to: ['transform'] } });
```

## Transform Factory

Utility for generating and accessing transforms

### .build

- Build a new transform object
- Accepts:
  - `path` (`String`)[required] - path to match
  - `action` (`Function`)[required] - action to perform (see Transform object documentation)
  - `params` (`Mixed`)[optional] - additional params to pass to the action
  - `name` (`String`)[optional] - name of the transform
- Returns: (`Object`) result of the transform

```javascript
jsonitron.Factory.build('foo.bar', function (v, k, p) {
  // See Transfrom object documentation
} , { some: 'param' }, 'fooTransform');
```

### .register

- Register a predefined transform
- Accepts:
  - `name` (`String`) - **unique** name of the transform
  - `action` (`Function`) - action to perform (see Transform object documentation)

```javascript
jsonitron.Factory.register('fooAction', function (v, k, p) {
  // See Transfrom object documentation
});

jsonitron.Factory.fooAction('foo.bar') // returns new Transform
jsonitron.Factory.createFooAction('foo.bar') // returns new Transform
jsonitron.Factory.buildFooAction('foo.bar') // returns new Transform
jsonitron.Factory.newFooAction('foo.bar') // returns new Transform
```

### Predefined

- Case
  - Value
   - `.upperCase(path)` - EXAMPLE OUTPUT
   - `.camelCas(path)e` - exmapleOutput
   - `.constantCase(path)` - EXAMPLE_OUTPUT
   - `.dotCase(path)` - example.output
   - `.headerCase(path)` - Example-Output
   - `.lowerCase(path)` - example output
   - `.lowerFirstCase(path)` - eXAMPLE OUTPUT
   - `.noCase(path)` - example output
   - `.paramCase(path)` - example-output
   - `.pascalCase(path)` - ExampleOutput
   - `.pathCase(path)` - example/output
   - `.sentenceCase(path)` - Example output
   - `.snakeCase(path)` - exmaple_output
   - `.swapCase(path)` - eXAMPLE oUTPUT
   - `.titleCase(path)` - Example Output
   - `.upperCase(path)` - EXAMPLE OUTPUT
   - `.upperFirstCase(path)` - Example output
  - Key
  - `.upperCaseKey(path)` - EXAMPLE OUTPUT
  - `.camelCasKey(path)` - exmapleOutput
  - `.constantCaseKey(path)` - EXAMPLE_OUTPUT
  - `.dotCaseKey(path)` - example.output
  - `.headerCaseKey(path)` - Example-Output
  - `.lowerCaseKey(path)` - example output
  - `.lowerFirstCaseKey(path)` - eXAMPLE OUTPUT
  - `.noCaseKey(path)` - example output
  - `.paramCaseKey(path)` - example-output
  - `.pascalCaseKey(path)` - ExampleOutput
  - `.pathCaseKey(path)` - example/output
  - `.sentenceCaseKey(path)` - Example output
  - `.snakeCaseKey(path)` - exmaple_output
  - `.swapCaseKey(path)` - eXAMPLE oUTPUT
  - `.titleCaseKey(path)` - Example Output
  - `.upperCaseKey(path)` - EXAMPLE OUTPUT
  - `.upperFirstCaseKey(path)` - Example output
- Misc
  - `.renameKey(path, newName)`
   - convert last property in the path to use the new name
   - `{ test: 'foo '}` => `renameKey('test', 'bar')` => `{ bar: 'foo' }`


## Transformer

A thin wrapper to execute a set of transforms

### Transformer constructor

- Returns a new Transform object

```javascript
let transformer = new jsonitron.Transfromer();
```

### .use

- Add a transform to the internal set of transforms
- Accepts:
  - `Transform` (`Function`)[required] - transform to be executed

```javascript
transformer.use(TransformFactory.upperCase('foo.bar'));
```

### .useAll

- Add a set of transforms to the internal set of transforms
- Accepts:
  - `Transform` (`Function`)[required] - transform to be executed


```javascript
transformer.useAll([
  TransformFactory.upperCase('foo.bar'),
  TransformFactory.lowerCase('foo.biz'),
]);
```

### .exec Transformer

- Execute the set of transforms on an object
- Accepts: `Object`
- Returns: (`Object`) result of the transforms

```javascript
let result = transformer.exec({ object: { to: ['transform'] } });
```

## Authors

- [John Hofrichter](https://github.com/johnhof)
