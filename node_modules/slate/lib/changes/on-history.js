'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _invert = require('../operations/invert');

var _invert2 = _interopRequireDefault(_invert);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Changes.
 *
 * @type {Object}
 */

var Changes = {};

/**
 * Redo to the next value in the history.
 *
 * @param {Change} change
 */

Changes.redo = function (change) {
  var value = change.value;
  var _value = value,
      history = _value.history;

  if (!history) return;

  var _history = history,
      undos = _history.undos,
      redos = _history.redos;

  var next = redos.peek();
  if (!next) return;

  // Shift the next value into the undo stack.
  redos = redos.pop();
  undos = undos.push(next);

  // Replay the next operations.
  next.forEach(function (op) {
    // When the operation mutates selection, omit its `isFocused` props to
    // prevent editor focus changing during continuously redoing.
    var type = op.type,
        properties = op.properties;

    if (type === 'set_selection') {
      properties = (0, _omit2.default)(properties, 'isFocused');
    }
    change.applyOperation(_extends({}, op, { properties: properties }), { save: false });
  });

  // Update the history.
  value = change.value;
  history = history.set('undos', undos).set('redos', redos);
  value = value.set('history', history);
  change.value = value;
};

/**
 * Undo the previous operations in the history.
 *
 * @param {Change} change
 */

Changes.undo = function (change) {
  var value = change.value;
  var _value2 = value,
      history = _value2.history;

  if (!history) return;

  var _history2 = history,
      undos = _history2.undos,
      redos = _history2.redos;

  var previous = undos.peek();
  if (!previous) return;

  // Shift the previous operations into the redo stack.
  undos = undos.pop();
  redos = redos.push(previous);

  // Replay the inverse of the previous operations.
  previous.slice().reverse().map(_invert2.default).forEach(function (inverseOp) {
    // When the operation mutates selection, omit its `isFocused` props to
    // prevent editor focus changing during continuously undoing.
    var type = inverseOp.type,
        properties = inverseOp.properties;

    if (type === 'set_selection') {
      properties = (0, _omit2.default)(properties, 'isFocused');
    }
    change.applyOperation(_extends({}, inverseOp, { properties: properties }), { save: false });
  });

  // Update the history.
  value = change.value;
  history = history.set('undos', undos).set('redos', redos);
  value = value.set('history', history);
  change.value = value;
};

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = Changes;