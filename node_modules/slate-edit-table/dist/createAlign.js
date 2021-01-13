'use strict';

var _require = require('immutable'),
    Range = _require.Range;

var ALIGN = require('./ALIGN');

/**
 * Create a set of alignment
 * @param  {Number} columns
 * @param  {List} base
 * @return {List} list
 */
function createAlign(columns) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return Range(0, columns).map(function (i) {
    return base[i] || ALIGN.DEFAULT;
  }).toArray();
}

module.exports = createAlign;