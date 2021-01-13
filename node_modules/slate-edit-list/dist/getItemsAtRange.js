'use strict';

var _require = require('immutable'),
    List = _require.List;

var isList = require('./isList');
var getCurrentItem = require('./getCurrentItem');

/**
 * Return the list of items at the given range. The returned items are
 * the highest list item blocks that cover the range.
 *
 * @param {PluginOptions} opts
 * @param {Slate.Node} value
 * @param {Slate.Selection} [range]
 * @return {List<Slate.Block>} Empty if no list of items can cover the range
 */
function getItemsAtRange(opts, value, range) {
    range = range || value.selection;

    if (!range.startKey) {
        return List();
    }

    var document = value.document;


    var startBlock = document.getClosestBlock(range.startKey);
    var endBlock = document.getClosestBlock(range.endKey);

    if (startBlock === endBlock) {
        var item = getCurrentItem(opts, value, startBlock);
        return item ? List([item]) : List();
    }

    var ancestor = document.getCommonAncestor(startBlock.key, endBlock.key);

    if (isList(opts, ancestor)) {
        var startPath = ancestor.getPath(startBlock.key);
        var endPath = ancestor.getPath(endBlock.key);

        return ancestor.nodes.slice(startPath[0], endPath[0] + 1);
    } else if (ancestor.type === opts.typeItem) {
        // The ancestor is the highest list item that covers the range
        return List([ancestor]);
    } else {
        // No list of items can cover the range
        return List();
    }
}

module.exports = getItemsAtRange;