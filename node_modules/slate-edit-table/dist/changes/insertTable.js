'use strict';

var createTable = require('../createTable');

/**
 * Insert a new table
 *
 * @param {Options} opts The plugin options
 * @param {Slate.Change} change
 * @param {Number} columns
 * @param {Number} rows
 * @return {Slate.Change}
 */
function insertTable(opts, change) {
  var columns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var rows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
  var state = change.state;


  if (!state.selection.startKey) return false;

  // Create the table node
  var fillWithEmptyText = function fillWithEmptyText(x, y) {
    return '';
  };
  var table = createTable(opts, columns, rows, fillWithEmptyText);

  return change.insertBlock(table);
}

module.exports = insertTable;