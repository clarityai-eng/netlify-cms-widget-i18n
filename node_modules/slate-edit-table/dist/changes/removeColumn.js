'use strict';

var _require = require('immutable'),
    List = _require.List;

var TablePosition = require('../TablePosition');

/**
 * Delete current column in a table
 *
 * @param {Options} opts The plugin options
 * @param {Slate.Change} change
 * @param {Number} at
 * @return {Slate.Change}
 */
function removeColumn(opts, change, at) {
    var state = change.state;
    var startBlock = state.startBlock;


    var pos = TablePosition.create(state, startBlock);
    var table = pos.table;


    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    var rows = table.nodes;

    // Remove the cell from every row
    if (pos.getWidth() > 1) {
        rows.forEach(function (row) {
            var cell = row.nodes.get(at);
            change.removeNodeByKey(cell.key);
        });

        // Update alignment
        var align = List(table.data.get('align'));
        align = align.delete(at);
        change.setNodeByKey(table.key, {
            data: table.data.set('align', align)
        });
    }
    // If last column, clear text in cells instead
    else {
            rows.forEach(function (row) {
                row.nodes.forEach(function (cell) {
                    cell.nodes.forEach(function (node) {
                        // We clear the texts in the cells
                        change.removeNodeByKey(node.key);
                    });
                });
            });
        }

    // Replace the table
    return change;
}

module.exports = removeColumn;