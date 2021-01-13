'use strict';

var createRow = require('../createRow');
var TablePosition = require('../TablePosition');

/**
 * Insert a new row in current table
 *
 * @param {Options} opts The plugin options
 * @param {Slate.Change} change
 * @param {Number} at
 * @param {Function} textGetter
 * @return {Slate.Change}
 */
function insertRow(opts, change, at, textGetter) {
    var state = change.state;
    var startBlock = state.startBlock;


    var pos = TablePosition.create(state, startBlock);
    var table = pos.table;

    // Create a new row with the right count of cells

    var firstRow = table.nodes.get(0);
    var newRow = createRow(opts, firstRow.nodes.size, textGetter);

    if (typeof at === 'undefined') {
        at = pos.getRowIndex() + 1;
    }

    return change.insertNodeByKey(table.key, at, newRow).collapseToEndOf(newRow.nodes.get(pos.getColumnIndex()));
}

module.exports = insertRow;