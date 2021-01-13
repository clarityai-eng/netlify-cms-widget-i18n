'use strict';

var TablePosition = require('../TablePosition');

/**
 * Remove current row in a table. Clear it if last remaining row
 *
 * @param {Options} opts The plugin options
 * @param {Slate.Change} change
 * @param {Number} at
 * @return {Slate.Change}
 */
function removeRow(opts, change, at) {
    var state = change.state;
    var startBlock = state.startBlock;


    var pos = TablePosition.create(state, startBlock);
    var table = pos.table;


    if (typeof at === 'undefined') {
        at = pos.getRowIndex();
    }

    var row = table.nodes.get(at);
    // Update table by removing the row
    if (pos.getHeight() > 1) {
        change.removeNodeByKey(row.key);
    }
    // If last remaining row, clear it instead
    else {
            row.nodes.forEach(function (cell) {
                cell.nodes.forEach(function (node) {
                    change.removeNodeByKey(node.key);
                });
            });
        }

    return change;
}

module.exports = removeRow;