'use strict';

var Slate = require('slate');

function onBackspace(event, change, opts) {
    var state = change.state;
    var startBlock = state.startBlock,
        startOffset = state.startOffset,
        isCollapsed = state.isCollapsed,
        endBlock = state.endBlock;

    // If a cursor is collapsed at the start of the block, do nothing

    if (startOffset === 0 && isCollapsed) {
        event.preventDefault();
        return change;
    }

    // If "normal" deletion, we continue
    if (startBlock === endBlock) {
        return null;
    }

    // If cursor is between multiple blocks,
    // we clear the content of the cells
    event.preventDefault();

    var blocks = state.blocks,
        focusBlock = state.focusBlock;

    blocks.forEach(function (block) {
        if (block.type !== opts.typeCell) {
            return change;
        }

        var cellRange = Slate.Range.create().moveToRangeOf(block);

        return change.deleteAtRange(cellRange);
    });

    // Clear selected cells
    return change.collapseToStartOf(focusBlock);
}

module.exports = onBackspace;