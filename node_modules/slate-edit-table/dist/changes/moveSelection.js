'use strict';

var TablePosition = require('../TablePosition');

/**
 * Move selection to {x,y}
 *
 * @param {Options} opts The plugin options
 * @param {Slate.Change} change
 * @param {Number} x
 * @param {Number} y
 * @return {Slate.Change}
 */
function moveSelection(opts, change, x, y) {
    var state = change.state;
    var startBlock = state.startBlock,
        startOffset = state.startOffset;


    if (startBlock.type !== opts.typeCell) {
        throw new Error('moveSelection can only be applied from within a cell');
    }

    var pos = TablePosition.create(state, startBlock);
    var table = pos.table;


    var row = table.nodes.get(y);
    var cell = row.nodes.get(x);

    // Calculate new offset
    if (startOffset > cell.text.length) {
        startOffset = cell.text.length;
    }

    return change.collapseToEndOf(cell).moveOffsetsTo(startOffset);
}

module.exports = moveSelection;