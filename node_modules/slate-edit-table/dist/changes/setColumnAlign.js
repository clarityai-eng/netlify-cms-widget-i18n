'use strict';

var TablePosition = require('../TablePosition');
var ALIGN = require('../ALIGN');
var createAlign = require('../createAlign');

/**
 * Sets column alignment for a given column
 *
 * @param {Options} opts The plugin options
 * @param {Slate.Change} change
 * @param {Number} at
 * @param {String} align
 * @return {Slate.Change}
 */
function setColumnAlign(opts, change) {
    var align = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ALIGN.DEFAULT;
    var at = arguments[3];
    var state = change.state;
    var startBlock = state.startBlock;


    var pos = TablePosition.create(state, startBlock);
    var table = pos.table;

    // Figure out column position

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    var newAlign = createAlign(pos.getWidth(), table.data.get('align'));
    newAlign[at] = align;

    change.setNodeByKey(table.key, {
        data: table.data.set('align', newAlign)
    });

    return change;
}

module.exports = setColumnAlign;