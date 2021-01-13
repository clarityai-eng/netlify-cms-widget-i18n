'use strict';

var Slate = require('slate');

var _require = require('immutable'),
    List = _require.List;

var isList = require('../isList');

/**
 * Wrap the blocks in the current selection in a new list. Selected
 * lists are merged together.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @param  {String?} type
 * @param  {Object|Data?} [data]
 * @return {Transform} transform
 */
function wrapInList(opts, transform, ordered, data) {
    var selectedBlocks = getHighestSelectedBlocks(transform.state);
    var type = ordered || opts.types[0];

    // Wrap in container
    transform.wrapBlock({
        type: type,
        data: Slate.Data.create(data)
    });

    // Wrap in list items
    selectedBlocks.forEach(function (node) {
        if (isList(opts, node)) {
            // Merge its items with the created list
            node.nodes.forEach(function (_ref) {
                var key = _ref.key;
                return transform.unwrapNodeByKey(key);
            });
        } else {
            transform.wrapBlockByKey(node.key, opts.typeItem);
        }
    });

    return transform;
}

/**
 * @param  {Slate.State} state
 * @return {List<Block>} The highest list of blocks that cover the
 * current selection
 */
function getHighestSelectedBlocks(state) {
    var range = state.selection;
    var document = state.document;


    var startBlock = document.getClosestBlock(range.startKey);
    var endBlock = document.getClosestBlock(range.endKey);

    if (startBlock === endBlock) {
        return List([startBlock]);
    } else {
        var ancestor = document.getCommonAncestor(startBlock.key, endBlock.key);
        var startPath = ancestor.getPath(startBlock.key);
        var endPath = ancestor.getPath(endBlock.key);

        return ancestor.nodes.slice(startPath[0], endPath[0] + 1);
    }
}

module.exports = wrapInList;