'use strict';

var TablePosition = require('../TablePosition');

/**
 * Delete the whole table
 *
 * @param {Options} opts The plugin options
 * @param {Slate.Change} change
 * @param {Number} at
 * @return {Slate.Change}
 */
function removeTable(opts, change, at) {
  var state = change.state;
  var startBlock = state.startBlock;


  var pos = TablePosition.create(state, startBlock);
  var table = pos.table;


  return change.removeNodeByKey(table.key);
}

module.exports = removeTable;