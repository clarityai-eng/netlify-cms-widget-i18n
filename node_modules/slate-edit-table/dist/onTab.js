'use strict';

var TablePosition = require('./TablePosition');
var moveSelectionBy = require('./changes/moveSelectionBy');
var insertRow = require('./changes/insertRow');

/**
 * Select all text of current block.
 * @param {Slate.Change} change
 * @return {Slate.Change}
 */
function selectAllText(change) {
    var state = change.state;
    var startBlock = state.startBlock;


    return change.moveOffsetsTo(0).extend(startBlock.text.length);
}

/**
 * Pressing "Tab" moves the cursor to the next cell
 * and select the whole text
 */
function onTab(event, change, opts) {
    event.preventDefault();
    var _change = change,
        state = _change.state;

    var direction = event.shiftKey ? -1 : +1;

    // Create new row if needed
    var startBlock = state.startBlock,
        selection = state.selection;

    var pos = TablePosition.create(state, startBlock);
    if (pos.isFirstCell() && direction === -1) {
        insertRow(opts, change, 0);
    } else if (pos.isLastCell() && direction === 1) {
        insertRow(opts, change);
    }

    // Move back to initial cell (insertRow moves selection automatically).
    change = change.select(selection);

    // Move
    moveSelectionBy(opts, change, direction, 0);

    // Select all cell.
    return selectAllText(change);
}

module.exports = onTab;