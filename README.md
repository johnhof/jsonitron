# JSONitron

JSON transformer for use in data hygene and proxy

## Key

- [Usage](#usage)
- [Transform](#transform)
  - [Constructor](#constructor)
  - [.setPath](#setpath)
  - [.setName](#setname)
  - [.setAction](#setaction)
  - [.exec](#exec-transform)
- [Transform Factory](#transform-factory)
- [Transformer](#transformer)

## Usage

## Transform

### Constructor

- Returns a new Transform object
- Accepts: `Object`
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
  - `` - 
  - `` -
  - `` -
  - `` -
  - `` -
  - `` -
  - `` -
  - `` -
  - `` -
  - `` -
  - `` -
  - `` -
  - `` -
  - `` -
  - `` -
   - `` -

## Transformer

## Authors

- [John Hofrichter](https://github.com/johnhof)
