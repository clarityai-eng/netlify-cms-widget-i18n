'use strict';

var getCurrentItem = require('../getCurrentItem');

/**
 * Split a list item.
 *
 * @param  {Object} opts
 * @param  {Transform} transform
 * @return {Transform} transform
 */
function splitListItem(opts, transform) {
  var state = transform.state;

  var currentItem = getCurrentItem(opts, state);
  var splitOffset = currentItem.getOffsetAtRange(state.selection.collapseToStart());
  return transform.splitNodeByKey(currentItem.key, splitOffset);
}

module.exports = splitListItem;