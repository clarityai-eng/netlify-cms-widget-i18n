'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _node = require('../models/node');

var _node2 = _interopRequireDefault(_node);

var _mark = require('../models/mark');

var _mark2 = _interopRequireDefault(_mark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = (0, _debug2.default)('slate:operation:apply');

/**
 * Applying functions.
 *
 * @type {Object}
 */

var APPLIERS = {

  /**
   * Add mark to text at `offset` and `length` in node by `path`.
   *
   * @param {Value} value
   * @param {Object} operation
   * @return {Value}
   */

  add_mark: function add_mark(value, operation) {
    var path = operation.path,
        offset = operation.offset,
        length = operation.length;

    var mark = _mark2.default.create(operation.mark);
    var _value = value,
        document = _value.document;

    var node = document.assertPath(path);
    node = node.addMark(offset, length, mark);
    document = document.updateNode(node);
    value = value.set('document', document);
    return value;
  },


  /**
   * Insert a `node` at `index` in a node by `path`.
   *
   * @param {Value} value
   * @param {Object} operation
   * @return {Value}
   */

  insert_node: function insert_node(value, operation) {
    var path = operation.path;

    var node = _node2.default.create(operation.node);
    var index = path[path.length - 1];
    var rest = path.slice(0, -1);
    var _value2 = value,
        document = _value2.document;

    var parent = document.assertPath(rest);
    parent = parent.insertNode(index, node);
    document = document.updateNode(parent);
    value = value.set('document', document);
    return value;
  },


  /**
   * Insert `text` at `offset` in node by `path`.
   *
   * @param {Value} value
   * @param {Object} operation
   * @return {Value}
   */

  insert_text: function insert_text(value, operation) {
    var path = operation.path,
        offset = operation.offset,
        text = operation.text;
    var marks = operation.marks;

    if (Array.isArray(marks)) marks = _mark2.default.createSet(marks);

    var _value3 = value,
        document = _value3.document,
        selection = _value3.selection;
    var _selection = selection,
        anchorKey = _selection.anchorKey,
        focusKey = _selection.focusKey,
        anchorOffset = _selection.anchorOffset,
        focusOffset = _selection.focusOffset;

    var node = document.assertPath(path);

    // Update the document
    node = node.insertText(offset, text, marks);
    document = document.updateNode(node);

    // Update the selection
    if (anchorKey == node.key && anchorOffset >= offset) {
      selection = selection.moveAnchor(text.length);
    }
    if (focusKey == node.key && focusOffset >= offset) {
      selection = selection.moveFocus(text.length);
    }

    value = value.set('document', document).set('selection', selection);
    return value;
  },


  /**
   * Merge a node at `path` with the previous node.
   *
   * @param {Value} value
   * @param {Object} operation
   * @return {Value}
   */

  merge_node: function merge_node(value, operation) {
    var path = operation.path;

    var withPath = path.slice(0, path.length - 1).concat([path[path.length - 1] - 1]);
    var _value4 = value,
        document = _value4.document,
        selection = _value4.selection;

    var one = document.assertPath(withPath);
    var two = document.assertPath(path);
    var parent = document.getParent(one.key);
    var oneIndex = parent.nodes.indexOf(one);
    var twoIndex = parent.nodes.indexOf(two);

    // Perform the merge in the document.
    parent = parent.mergeNode(oneIndex, twoIndex);
    document = document.updateNode(parent);

    // If the nodes are text nodes and the selection is inside the second node
    // update it to refer to the first node instead.
    if (one.kind == 'text') {
      var _selection2 = selection,
          anchorKey = _selection2.anchorKey,
          anchorOffset = _selection2.anchorOffset,
          focusKey = _selection2.focusKey,
          focusOffset = _selection2.focusOffset;

      var normalize = false;

      if (anchorKey == two.key) {
        selection = selection.moveAnchorTo(one.key, one.text.length + anchorOffset);
        normalize = true;
      }

      if (focusKey == two.key) {
        selection = selection.moveFocusTo(one.key, one.text.length + focusOffset);
        normalize = true;
      }

      if (normalize) {
        selection = selection.normalize(document);
      }
    }

    // Update the document and selection.
    value = value.set('document', document).set('selection', selection);
    return value;
  },


  /**
   * Move a node by `path` to `newPath`.
   *
   * @param {Value} value
   * @param {Object} operation
   * @return {Value}
   */

  move_node: function move_node(value, operation) {
    var path = operation.path,
        newPath = operation.newPath;

    var newIndex = newPath[newPath.length - 1];
    var newParentPath = newPath.slice(0, -1);
    var oldParentPath = path.slice(0, -1);
    var oldIndex = path[path.length - 1];
    var _value5 = value,
        document = _value5.document;

    var node = document.assertPath(path);

    // Remove the node from its current parent.
    var parent = document.getParent(node.key);
    parent = parent.removeNode(oldIndex);
    document = document.updateNode(parent);

    // Find the new target...
    var target = void 0;

    // If the old path and the rest of the new path are the same, then the new
    // target is the old parent.
    if (oldParentPath.every(function (x, i) {
      return x === newParentPath[i];
    }) && oldParentPath.length === newParentPath.length) {
      target = parent;
    }

    // Otherwise, if the old path removal resulted in the new path being no longer
    // correct, we need to decrement the new path at the old path's last index.
    else if (oldParentPath.every(function (x, i) {
        return x === newParentPath[i];
      }) && oldIndex < newParentPath[oldParentPath.length]) {
        newParentPath[oldParentPath.length]--;
        target = document.assertPath(newParentPath);
      }

      // Otherwise, we can just grab the target normally...
      else {
          target = document.assertPath(newParentPath);
        }

    // Insert the new node to its new parent.
    target = target.insertNode(newIndex, node);
    document = document.updateNode(target);
    value = value.set('document', document);
    return value;
  },


  /**
   * Remove mark from text at `offset` and `length` in node by `path`.
   *
   * @param {Value} value
   * @param {Object} operation
   * @return {Value}
   */

  remove_mark: function remove_mark(value, operation) {
    var path = operation.path,
        offset = operation.offset,
        length = operation.length;

    var mark = _mark2.default.create(operation.mark);
    var _value6 = value,
        document = _value6.document;

    var node = document.assertPath(path);
    node = node.removeMark(offset, length, mark);
    document = document.updateNode(node);
    value = value.set('document', document);
    return value;
  },


  /**
   * Remove a node by `path`.
   *
   * @param {Value} value
   * @param {Object} operation
   * @return {Value}
   */

  remove_node: function remove_node(value, operation) {
    var path = operation.path;
    var _value7 = value,
        document = _value7.document,
        selection = _value7.selection;
    var _selection3 = selection,
        startKey = _selection3.startKey,
        endKey = _selection3.endKey;

    var node = document.assertPath(path);
    // If the selection is set, check to see if it needs to be updated.
    if (selection.isSet) {
      var hasStartNode = node.hasNode(startKey);
      var hasEndNode = node.hasNode(endKey);
      var first = node.kind == 'text' ? node : node.getFirstText() || node;
      var last = node.kind == 'text' ? node : node.getLastText() || node;
      var prev = document.getPreviousText(first.key);
      var next = document.getNextText(last.key);

      // If the start point was in this node, update it to be just before/after.
      if (hasStartNode) {
        if (prev) {
          selection = selection.moveStartTo(prev.key, prev.text.length);
        } else if (next) {
          selection = selection.moveStartTo(next.key, 0);
        } else {
          selection = selection.deselect();
        }
      }

      // If the end point was in this node, update it to be just before/after.
      if (selection.isSet && hasEndNode) {
        if (prev) {
          selection = selection.moveEndTo(prev.key, prev.text.length);
        } else if (next) {
          selection = selection.moveEndTo(next.key, 0);
        } else {
          selection = selection.deselect();
        }
      }

      // If the selection wasn't deselected, normalize it.
      if (selection.isSet) {
        selection = selection.normalize(document);
      }
    }

    // Remove the node from the document.
    var parent = document.getParent(node.key);
    var index = parent.nodes.indexOf(node);
    parent = parent.removeNode(index);
    document = document.updateNode(parent);

    // Update the document and selection.
    value = value.set('document', document).set('selection', selection);
    return value;
  },


  /**
   * Remove `text` at `offset` in node by `path`.
   *
   * @param {Value} value
   * @param {Object} operation
   * @return {Value}
   */

  remove_text: function remove_text(value, operation) {
    var path = operation.path,
        offset = operation.offset,
        text = operation.text;
    var length = text.length;

    var rangeOffset = offset + length;
    var _value8 = value,
        document = _value8.document,
        selection = _value8.selection;
    var _selection4 = selection,
        anchorKey = _selection4.anchorKey,
        focusKey = _selection4.focusKey,
        anchorOffset = _selection4.anchorOffset,
        focusOffset = _selection4.focusOffset;

    var node = document.assertPath(path);

    // Update the selection.
    if (anchorKey == node.key && anchorOffset >= rangeOffset) {
      selection = selection.moveAnchor(-length);
    }

    if (focusKey == node.key && focusOffset >= rangeOffset) {
      selection = selection.moveFocus(-length);
    }

    node = node.removeText(offset, length);
    document = document.updateNode(node);
    value = value.set('document', document).set('selection', selection);
    return value;
  },


  /**
   * Set `properties` on mark on text at `offset` and `length` in node by `path`.
   *
   * @param {Value} value
   * @param {Object} operation
   * @return {Value}
   */

  set_mark: function set_mark(value, operation) {
    var path = operation.path,
        offset = operation.offset,
        length = operation.length,
        properties = operation.properties;

    var mark = _mark2.default.create(operation.mark);
    var _value9 = value,
        document = _value9.document;

    var node = document.assertPath(path);
    node = node.updateMark(offset, length, mark, properties);
    document = document.updateNode(node);
    value = value.set('document', document);
    return value;
  },


  /**
   * Set `properties` on a node by `path`.
   *
   * @param {Value} value
   * @param {Object} operation
   * @return {Value}
   */

  set_node: function set_node(value, operation) {
    var path = operation.path,
        properties = operation.properties;
    var _value10 = value,
        document = _value10.document;

    var node = document.assertPath(path);

    // Delete properties that are not allowed to be updated.
    delete properties.nodes;
    delete properties.key;

    node = node.merge(properties);
    document = document.updateNode(node);
    value = value.set('document', document);
    return value;
  },


  /**
   * Set `properties` on the selection.
   *
   * @param {Value} value
   * @param {Object} operation
   * @return {Value}
   */

  set_selection: function set_selection(value, operation) {
    var properties = _extends({}, operation.properties);
    var _value11 = value,
        document = _value11.document,
        selection = _value11.selection;


    if (properties.marks != null) {
      properties.marks = _mark2.default.createSet(properties.marks);
    }

    if (properties.anchorPath !== undefined) {
      properties.anchorKey = properties.anchorPath === null ? null : document.assertPath(properties.anchorPath).key;
      delete properties.anchorPath;
    }

    if (properties.focusPath !== undefined) {
      properties.focusKey = properties.focusPath === null ? null : document.assertPath(properties.focusPath).key;
      delete properties.focusPath;
    }

    selection = selection.merge(properties);
    selection = selection.normalize(document);
    value = value.set('selection', selection);
    return value;
  },


  /**
   * Set `properties` on `value`.
   *
   * @param {Value} value
   * @param {Object} operation
   * @return {Value}
   */

  set_value: function set_value(value, operation) {
    var properties = operation.properties;

    // Delete properties that are not allowed to be updated.

    delete properties.document;
    delete properties.selection;
    delete properties.history;

    value = value.merge(properties);
    return value;
  },


  /**
   * Split a node by `path` at `offset`.
   *
   * @param {Value} value
   * @param {Object} operation
   * @return {Value}
   */

  split_node: function split_node(value, operation) {
    var path = operation.path,
        position = operation.position;
    var _value12 = value,
        document = _value12.document,
        selection = _value12.selection;

    // Calculate a few things...

    var node = document.assertPath(path);
    var parent = document.getParent(node.key);
    var index = parent.nodes.indexOf(node);

    // Split the node by its parent.
    parent = parent.splitNode(index, position);
    document = document.updateNode(parent);

    // Determine whether we need to update the selection...
    var _selection5 = selection,
        startKey = _selection5.startKey,
        endKey = _selection5.endKey,
        startOffset = _selection5.startOffset,
        endOffset = _selection5.endOffset;

    var next = document.getNextText(node.key);
    var normalize = false;

    // If the start point is after or equal to the split, update it.
    if (node.key == startKey && position <= startOffset) {
      selection = selection.moveStartTo(next.key, startOffset - position);
      normalize = true;
    }

    // If the end point is after or equal to the split, update it.
    if (node.key == endKey && position <= endOffset) {
      selection = selection.moveEndTo(next.key, endOffset - position);
      normalize = true;
    }

    // Normalize the selection if we changed it, since the methods we use might
    // leave it in a non-normalized value.
    if (normalize) {
      selection = selection.normalize(document);
    }

    // Return the updated value.
    value = value.set('document', document).set('selection', selection);
    return value;
  }
};

/**
 * Apply an `operation` to a `value`.
 *
 * @param {Value} value
 * @param {Object} operation
 * @return {Value} value
 */

function applyOperation(value, operation) {
  var type = operation.type;

  var apply = APPLIERS[type];

  if (!apply) {
    throw new Error('Unknown operation type: "' + type + '".');
  }

  debug(type, operation);
  value = apply(value, operation);
  return value;
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = applyOperation;