'use strict';

var getItemsAtRange = require('../getItemsAtRange');

/**
 * Unwrap items at range from their list.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @return {Transform} transform
 */
function unwrapList(opts, transform) {
    var items = getItemsAtRange(opts, transform.state);

    if (items.isEmpty()) {
        return transform;
    }

    // Unwrap the items from their list
    items.forEach(function (item) {
        return transform.unwrapNodeByKey(item.key);
    });

    // Parent of the list of the items
    var firstItem = items.first();
    var parent = transform.state.document.getParent(firstItem.key);

    var index = parent.nodes.findIndex(function (node) {
        return node.key === firstItem.key;
    });

    // Unwrap the items' children
    items.forEach(function (item) {
        item.nodes.forEach(function (node) {
            transform.moveNodeByKey(node.key, parent.key, index, node, { normalize: false });
            index++;
        });
    });

    // Finally, remove the now empty items
    items.forEach(function (item) {
        return transform.removeNodeByKey(item.key);
    });

    return transform;
}

module.exports = unwrapList;