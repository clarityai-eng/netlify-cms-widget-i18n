'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * A Slate plugin to add soft breaks on return.
 *
 * @param {Object} options
 *   @property {Array} onlyIn
 *   @property {Array} ignoreIn
 * @return {Object}
 */

function SoftBreak() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return {
    onKeyDown: function onKeyDown(event, change) {
      var value = change.value;

      if (event.key != 'Enter') return;
      if (options.shift && event.shiftKey == false) return;

      var startBlock = value.startBlock;
      var type = startBlock.type;

      if (options.onlyIn && !options.onlyIn.includes(type)) return;
      if (options.ignoreIn && options.ignoreIn.includes(type)) return;

      return change.insertText('\n');
    }
  };
}

/**
 * Export.
 */

exports.default = SoftBreak;