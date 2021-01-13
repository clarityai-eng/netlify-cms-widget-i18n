'use strict';

var Slate = require('slate');

var _require = require('immutable'),
    Range = _require.Range,
    List = _require.List;

var createAlign = require('./createAlign');

/**
 * Create a schema for tables
 * @param {Options} opts The plugin options
 * @return {Object} A schema definition with rules to normalize tables
 */
function makeSchema(opts) {
    return {
        rules: [noBlocksWithinCell(opts), cellsWithinTable(opts), rowsWithinTable(opts), tablesContainOnlyRows(opts), rowsContainRequiredColumns(opts), tableContainAlignData(opts)]
    };
}

/**
 * Rule to enforce cells only contain inlines or text.
 * It unwrap blocks in cell blocks
 *
 * @param {Options} opts The plugin options
 * @return {Object} A rule to enforce cells only contain inlines or text.
 */
function noBlocksWithinCell(opts) {
    return {
        match: function match(node) {
            return node.kind == 'block' && node.type == opts.typeCell;
        },


        // Find nested blocks
        validate: function validate(node) {
            var nestedBlocks = node.nodes.filter(function (child) {
                return child.kind === 'block';
            });

            return nestedBlocks.size > 0 ? nestedBlocks : null;
        },


        // If any, unwrap all nested blocks
        normalize: function normalize(change, node, nestedBlocks) {
            nestedBlocks.forEach(function (block) {
                return block.nodes.forEach(function (grandChild) {
                    change.unwrapNodeByKey(grandChild.key);
                });
            });

            return change;
        }
    };
}

/**
 * Rule to enforce cells are always surrounded by a row.
 *
 * @param {Options} opts The plugin options
 * @return {Object} A rule to ensure cells are always surrounded by a row.
 */
function cellsWithinTable(opts) {
    return {
        match: function match(node) {
            return (node.kind === 'document' || node.kind === 'block') && node.type !== opts.typeRow;
        },


        // Find child cells nodes not in a row
        validate: function validate(node) {
            var cells = node.nodes.filter(function (n) {
                return n.type === opts.typeCell;
            });

            if (cells.isEmpty()) return;

            return {
                cells: cells
            };
        },


        // If any, wrap all cells in a row block
        normalize: function normalize(change, node, _ref) {
            var cells = _ref.cells;

            cells.forEach(function (cell) {
                return change.wrapBlockByKey(cell.key, opts.typeRow, { normalize: false });
            });

            return change;
        }
    };
}

/**
 * Rule to enforce rows are always surrounded by a table.
 *
 * @param {Options} opts The plugin options
 * @return {Object} A rule to ensure rows are always surrounded by a table.
 */
function rowsWithinTable(opts) {
    return {
        match: function match(node) {
            return (node.kind === 'document' || node.kind === 'block') && node.type !== opts.typeTable;
        },


        // Find child cells nodes not in a row
        validate: function validate(node) {
            var rows = node.nodes.filter(function (n) {
                return n.type === opts.typeRow;
            });

            if (rows.isEmpty()) return;

            return {
                rows: rows
            };
        },


        // If any, wrap all cells in a row block
        normalize: function normalize(change, node, _ref2) {
            var rows = _ref2.rows;

            rows.forEach(function (row) {
                return change.wrapBlockByKey(row.key, {
                    type: opts.typeTable,
                    data: {
                        align: createAlign(row.nodes.size)
                    }
                }, { normalize: false });
            });

            return change;
        }
    };
}

/**
 * @param {Options} opts The plugin options
 * @return {Object} A rule that ensures tables only contain rows and
 * at least one.
 */
function tablesContainOnlyRows(opts) {
    var isRow = function isRow(node) {
        return node.type === opts.typeRow;
    };

    return {
        match: function match(node) {
            return node.type === opts.typeTable;
        },
        validate: function validate(table) {
            // Figure out invalid rows
            var invalids = table.nodes.filterNot(isRow);

            // Figure out valid rows
            var add = invalids.size === table.nodes.size ? [makeEmptyRow(opts)] : [];

            if (invalids.isEmpty() && add.length === 0) {
                return null;
            }

            return {
                invalids: invalids,
                add: add
            };
        },


        /**
         * Replaces the node's children
         * @param {List<Nodes>} value.nodes
         */
        normalize: function normalize(change, node, _ref3) {
            var _ref3$invalids = _ref3.invalids,
                invalids = _ref3$invalids === undefined ? [] : _ref3$invalids,
                _ref3$add = _ref3.add,
                add = _ref3$add === undefined ? [] : _ref3$add;

            // Remove invalids
            invalids.forEach(function (child) {
                return change.removeNodeByKey(child.key, { normalize: false });
            });

            // Add valids
            add.forEach(function (child) {
                return change.insertNodeByKey(node.key, 0, child);
            });

            return change;
        }
    };
}

/**
 * @param {Options} opts The plugin options
 * @return {Object} A rule that ensures rows contains only cells, and
 * as much cells as there is columns in the table.
 */
function rowsContainRequiredColumns(opts) {
    var isRow = function isRow(node) {
        return node.type === opts.typeRow;
    };
    var isCell = function isCell(node) {
        return node.type === opts.typeCell;
    };
    var countCells = function countCells(row) {
        return row.nodes.count(isCell);
    };

    return {
        match: function match(node) {
            return node.type === opts.typeTable;
        },
        validate: function validate(table) {
            var rows = table.nodes.filter(isRow);

            // The number of column this table has
            var columns = rows.reduce(function (count, row) {
                return Math.max(count, countCells(row));
            }, 1); // Min 1 column


            // else normalize, by padding with empty cells
            var invalidRows = rows.map(function (row) {
                var cells = countCells(row);
                var invalids = row.nodes.filterNot(isCell);

                // Row is valid: right count of cells and no extra node
                if (invalids.isEmpty() && cells === columns) {
                    return null;
                }

                // Otherwise, remove the invalids and append the missing cells
                return {
                    row: row,
                    invalids: invalids,
                    add: columns - cells
                };
            }).filter(Boolean);

            return invalidRows.size > 0 ? invalidRows : null;
        },


        /**
         * Updates by key every given nodes
         * @param {List<Nodes>} value.toUpdate
         */
        normalize: function normalize(change, node, rows) {
            rows.forEach(function (_ref4) {
                var row = _ref4.row,
                    invalids = _ref4.invalids,
                    add = _ref4.add;

                invalids.forEach(function (child) {
                    change.removeNodeByKey(child.key, { normalize: false });
                });

                Range(0, add).forEach(function () {
                    var cell = makeEmptyCell(opts);
                    change.insertNodeByKey(row.key, 0, cell, { normalize: false });
                });
            });

            return change;
        }
    };
}

/**
 * @param {Options} opts The plugin options
 * @return {Object} A rule that ensures table node has all align data
 */
function tableContainAlignData(opts) {
    return {
        match: function match(node) {
            return node.type === opts.typeTable;
        },
        validate: function validate(table) {
            var align = table.data.get('align', List());
            var row = table.nodes.first();
            var columns = row.nodes.size;

            return align.length == columns ? null : { align: align, columns: columns };
        },


        /**
         * Updates by key the table to add the data
         * @param {Map} align
         * @param {Number} columns
         */
        normalize: function normalize(transform, node, _ref5) {
            var align = _ref5.align,
                columns = _ref5.columns;

            return transform.setNodeByKey(node.key, {
                data: node.data.set('align', createAlign(columns, align))
            }, { normalize: false });
        }
    };
}

function makeEmptyCell(opts) {
    return Slate.Block.create({
        type: opts.typeCell,
        nodes: List([Slate.Text.create('')])
    });
}

function makeEmptyRow(opts) {
    return Slate.Block.create({
        type: opts.typeRow,
        nodes: List([makeEmptyCell(opts)])
    });
}

module.exports = makeSchema;