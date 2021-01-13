'use strict';

var _require = require('immutable'),
    List = _require.List;

var TablePosition = require('../TablePosition');
var moveSelection = require('./moveSelection');
var createCell = require('../createCell');
var ALIGN = require('../ALIGN');

/**
 * Insert a new column in current table
 *
 * @param {Options} opts The plugin options
 * @param {Slate.Change} change
 * @param {Number} at
 * @param {String} columnAlign
 * @return {Slate.Change}
 */
function insertColumn(opts, change, at) {
    var columnAlign = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ALIGN.DEFAULT;
    var _change = change,
        state = _change.state;
    var startBlock = state.startBlock;


    var pos = TablePosition.create(state, startBlock);
    var table = pos.table;


    if (typeof at === 'undefined') {
        at = pos.getColumnIndex() + 1;
    }

    // Insert the new cell
    table.nodes.forEach(function (row) {
        var newCell = createCell(opts.typeCell);
        change = change.insertNodeByKey(row.key, at, newCell);
    });

    // Update alignment
    var align = List(table.data.get('align'));
    align = align.insert(at, columnAlign);
    change.setNodeByKey(table.key, {
        data: table.data.set('align', align)
    });

    // Update the selection (not doing can break the undo)
    return moveSelection(opts, change, pos.getColumnIndex() + 1, pos.getRowIndex());
}

module.exports = insertColumn;