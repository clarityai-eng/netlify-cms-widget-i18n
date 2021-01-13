'use strict';

var unwrapList = require('./changes/unwrapList');
var getCurrentItem = require('./getCurrentItem');

/**
 * User pressed Delete in an editor
 */
function onBackspace(event, change, editor, opts) {
    var value = change.value;
    var startOffset = value.startOffset,
        selection = value.selection;

    // Only unwrap...
    // ... with a collapsed selection

    if (selection.isExpanded) return;

    // ... when at the beginning of nodes
    if (startOffset > 0) return;
    // ... in a list
    var currentItem = getCurrentItem(opts, value);
    if (!currentItem) return;
    // ... more precisely at the beginning of the current item
    if (!selection.isAtStartOf(currentItem)) return;

    event.preventDefault();
    return unwrapList(opts, change);
}

module.exports = onBackspace;