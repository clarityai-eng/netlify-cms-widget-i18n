'use strict';

var unwrapList = require('./changes/unwrapList');
var splitListItem = require('./changes/splitListItem');
var decreaseItemDepth = require('./changes/decreaseItemDepth');
var getCurrentItem = require('./getCurrentItem');
var getItemDepth = require('./getItemDepth');

/**
 * User pressed Enter in an editor
 *
 * Enter in a list item should split the list item
 * Enter in an empty list item should remove it
 * Shift+Enter in a list item should make a new line
 */
function onEnter(event, change, editor, opts) {
    // Pressing Shift+Enter
    // should split block normally
    if (event.shiftKey) {
        return null;
    }

    var value = change.value;

    var currentItem = getCurrentItem(opts, value);

    // Not in a list
    if (!currentItem) {
        return null;
    }

    event.preventDefault();
    if (currentItem.isEmpty) {
        // Block is empty, we exit the list
        if (getItemDepth(opts, value) > 1) {
            return decreaseItemDepth(opts, change);
        } else {
            // Exit list
            return unwrapList(opts, change);
        }
    } else {
        // Split list item
        return splitListItem(opts, change);
    }
}

module.exports = onEnter;