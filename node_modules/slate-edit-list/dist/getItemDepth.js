'use strict';

var getCurrentItem = require('./getCurrentItem');

/**
 * Get depth of current block in a document list
 *
 * @param {PluginOptions} opts
 * @param {Slate.Value} value
 * @param {Slate.Block} block?
 * @return {Number}
 */
function getItemDepth(opts, value, block) {
    var document = value.document,
        startBlock = value.startBlock;

    block = block || startBlock;

    var currentItem = getCurrentItem(opts, value, block);
    if (!currentItem) {
        return 0;
    }

    var list = document.getParent(currentItem.key);

    return 1 + getItemDepth(opts, value, list);
}

module.exports = getItemDepth;