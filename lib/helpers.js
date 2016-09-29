'use strict';

const _ = require('lodash');

const TRAILING_DOT = /\.$/;
const SEG_SPLIT = /\]\.|\.|\[|\]/i;

let toss = module.exports.toss = (msg) => {
  let error = new Error(msg);
  throw error
}

let checkpoint = module.exports.checkpoint = (condition, msg) => {
  if (!condition) {
    toss(msg);
  } else {
    return {
      and: checkpoint
    };
  }
}


let findMatchingPaths = module.exports.findMatchingPaths = (path, obj) => {
  let pathSplit = path.split('*');
  let segments = path.split(SEG_SPLIT);
  let segmentCount = segments.length;
  let finalProp = segmentCount ? segments[segmentCount - 1] : null;

  // Base case - no sub-prop match
  if (!_.get(obj, pathSplit[0].replace(TRAILING_DOT, ''))) {
    return [];

  // Base case - one level sub-prop
  } else if (segmentCount === 1) {
    if (obj[finalProp]) {
      return [finalProp];
    } else {
      return [];
    }
  }

  let validPaths = [pathSplit.shift().replace(TRAILING_DOT, '')];
  let finalPaths = [];
  for (let basePath of validPaths) {
    let targetProp = _.get(obj, basePath);
    let currentSegments = basePath.split(SEG_SPLIT);
    let currentSegmentCount = currentSegments.length;
    let currentFinalProp = currentSegments[currentSegmentCount -1];

    // Array wildcard
    if (_.isArray(targetProp)) {
      let length = targetProp.length;
      for (let i = 0; i < length; i++) validPaths.push(`${basePath}[${i}]`);

    // Object wildcard
    } else if (_.isPlainObject(targetProp)) {
      let keys = Object.keys(targetProp);
      let length = keys.length;
      for (let key of keys) validPaths.push(`${basePath}.${key}`);

    // Test for final match
  } else if (currentSegments.length === segmentCount && (finalProp === '*' || finalProp === currentFinalProp)) {
      finalPaths.push(basePath)
    }
  }

  return finalPaths;
}

let findLastPropertyKey =  module.exports.findLastPropertyKey = (path) => {
  return (path || '').split(SEG_SPLIT).pop();
}
