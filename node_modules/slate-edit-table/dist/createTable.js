'use strict';

var _require = require('immutable'),
    Range = _require.Range;

var Slate = require('slate');
var createRow = require('./createRow');
var createAlign = require('./createAlign');

/**
 * Create a table
 *
 * @param {Slate.State} state
 * @param {Options} opts The plugin options
 * @param {Number} columns
 * @param {Number} rows
 * @param {Function} textGetter
 * @return {State.Block}
 */
function createTable(opts, columns, rows, textGetter) {
    var rowNodes = Range(0, rows).map(function (i) {
        return createRow(opts, columns, textGetter ? textGetter.bind(null, i) : null);
    }).toList();
    var align = createAlign(columns);

    return Slate.Block.create({
        type: opts.typeTable,
        nodes: rowNodes,
        data: {
            align: align
        }
    });
}

module.exports = createTable;