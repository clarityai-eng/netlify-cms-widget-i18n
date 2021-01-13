'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isList = require('./isList');

/**
 * Create a schema for lists
 * @param {PluginOptions} The plugin options
 * @return {Object} A schema definition with rules to normalize lists
 */
function makeSchema(opts) {
    var schema = {
        blocks: _defineProperty({}, opts.typeItem, {
            parent: { types: opts.types },
            nodes: [{ kinds: ['block'] }],
            normalize: function normalize(change, reason, context) {
                if (reason === 'parent_type_invalid') {
                    return change.unwrapBlockByKey(context.node.key, { normalize: false });
                }

                if (reason === 'child_kind_invalid') {
                    return wrapChildrenInDefaultBlock(change, opts, context.node);
                }
            }
        })
    };

    // validate all list types, ensure they only have list item children
    opts.types.forEach(function (type) {
        schema.blocks[type] = {
            nodes: [{ types: [opts.typeItem] }],
            normalize: function normalize(change, reason, context) {
                if (reason === 'child_type_invalid') {
                    return change.wrapBlockByKey(context.child.key, opts.typeItem, { normalize: false });
                }
            }
        };
    });

    return {
        schema: schema,
        validateNode: function validateNode(node) {
            return joinAdjacentLists(opts, node);
        }
    };
}

/**
 * Wraps all child nodes of a list item in the default block type.
 * @param {Slate.Change} A change object
 * @param {PluginOptions} The plugin options
 * @return {Slate.Change} A change object, for purposes of chaining
 */
function wrapChildrenInDefaultBlock(change, opts, node) {
    change.wrapBlockByKey(node.nodes.first().key, opts.typeDefault, { normalize: false });

    var wrapper = change.value.document.getDescendant(node.key).nodes.first();

    // Add the remaining items
    node.nodes.rest().forEach(function (child, index) {
        return change.moveNodeByKey(child.key, wrapper.key, index + 1, { normalize: false });
    });

    return change;
}

/**
 * @param {PluginOptions} The plugin options
 * @return {Object} A rule that joins adjacent, same types lists
 */
function joinAdjacentLists(opts, node) {
    if (node.kind !== 'document' && node.kind !== 'block') return;

    var invalids = node.nodes.map(function (child, i) {
        if (!isList(opts, child)) return;
        var next = node.nodes.get(i + 1);
        if (!next || next.type !== child.type) return;
        return [child, next];
    }).filter(Boolean);

    if (invalids.isEmpty()) return;

    /**
     * Join the list pairs
     */
    // We join in reverse order, so that multiple lists folds onto the first one
    return function (change) {
        invalids.reverse().forEach(function (pair) {
            var _pair = _slicedToArray(pair, 2),
                first = _pair[0],
                second = _pair[1];

            var updatedSecond = change.value.document.getDescendant(second.key);
            updatedSecond.nodes.forEach(function (secondNode, index) {
                change.insertNodeByKey(first.key, first.nodes.size + index, secondNode, { normalize: false });
            });

            change.removeNodeByKey(second.key, { normalize: false });
        });
    };
}

module.exports = makeSchema;