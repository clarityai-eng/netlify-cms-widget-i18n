'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slate = require('slate');

/**
 * Find the DOM node for a `key`.
 *
 * @param {String|Node} key
 * @return {Element}
 */

function findDOMNode(key) {
  if (_slate.Node.isNode(key)) {
    key = key.key;
  }

  var el = window.document.querySelector('[data-key="' + key + '"]');

  if (!el) {
    throw new Error('Unable to find a DOM node for "' + key + '". This is often because of forgetting to add `props.attributes` to a custom component.');
  }

  return el;
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = findDOMNode;