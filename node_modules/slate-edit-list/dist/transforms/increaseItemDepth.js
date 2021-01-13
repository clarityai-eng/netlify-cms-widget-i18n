'use strict';

var Slate = require('slate');

var getPreviousItem = require('../getPreviousItem');
var getCurrentItem = require('../getCurrentItem');
var getListForItem = require('../getListForItem');
var isList = require('../isList');

/**
 * Increase the depth of the current item by putting it in a sub-list
 * of previous item.
 * For first items in a list, does nothing.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @return {Transform} transform
 */
function increaseItemDepth(opts, transform) {
    var previousItem = getPreviousItem(opts, transform.state);

    if (!previousItem) {
        return transform;
    }

    var currentItem = getCurrentItem(opts, transform.state);

    // Move the item in the sublist of previous item
    return moveAsSubItem(opts, transform, currentItem, previousItem.key);
}

/**
 * Move the given item to the list at the end of destination node,
 * creating one if needed.
 *
 * @param {PluginOptions} opts
 * @param {Slate.Transform} transform
 * @param {Slate.Block} item The list item to add
 * @param {String} destKey The key of the destination node
 * @return {Slate.Transform}
 */
function moveAsSubItem(opts, transform, item, destKey) {
    var destination = transform.state.document.getDescendant(destKey);
    var lastIndex = destination.nodes.count();
    var lastChild = destination.nodes.last();

    // The potential existing last child list
    var existingList = isList(opts, lastChild) ? lastChild : null;

    if (existingList) {
        return transform.moveNodeByKey(item.key, existingList.key, existingList.nodes.count() // as last item
        );
    } else {
        var currentList = getListForItem(opts, transform.state, destination);

        var newSublist = Slate.Block.create({
            kind: 'block',
            type: currentList.type,
            data: currentList.data
        });

        transform = transform.insertNodeByKey(destKey, lastIndex, newSublist);

        return transform.moveNodeByKey(item.key, newSublist.key, 0);
    }
}

module.exports = increaseItemDepth;