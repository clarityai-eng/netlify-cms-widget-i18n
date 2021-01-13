'use strict';

var Slate = require('slate');
var TablePosition = require('./TablePosition');

/**
 * Exit the current table, by inserting a default block after the table.
 */
function onModEnter(event, change, opts) {
    var state = change.state;

    if (!state.isCollapsed) {
        return;
    }

    event.preventDefault();

    var exitBlock = Slate.Block.create({
        type: opts.exitBlockType,
        nodes: [Slate.Text.create('')]
    });

    var cell = state.startBlock;
    var table = TablePosition.create(state, cell).table;
    var tableParent = state.document.getParent(table.key);
    var insertionIndex = tableParent.nodes.indexOf(table) + 1;

    return change.insertNodeByKey(tableParent.key, insertionIndex, exitBlock).collapseToStartOf(exitBlock);
}

module.exports = onModEnter;