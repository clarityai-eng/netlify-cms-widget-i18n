'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getWindow = require('get-window');

var _getWindow2 = _interopRequireDefault(_getWindow);

var _selectionIsBackward = require('selection-is-backward');

var _selectionIsBackward2 = _interopRequireDefault(_selectionIsBackward);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * CSS overflow values that would cause scrolling.
 *
 * @type {Array}
 */

var OVERFLOWS = ['auto', 'overlay', 'scroll'];

/**
 * Find the nearest parent with scrolling, or window.
 *
 * @param {el} Element
 */

function findScrollContainer(el) {
  var window = (0, _getWindow2.default)(el);
  var parent = el.parentNode;
  var scroller = void 0;

  while (!scroller) {
    if (!parent.parentNode) break;
    var style = window.getComputedStyle(parent);
    var overflowY = style.overflowY;


    if (OVERFLOWS.includes(overflowY)) {
      scroller = parent;
      break;
    }

    parent = parent.parentNode;
  }

  if (!scroller) return window;

  return scroller;
}

/**
 * Scroll the current selection's focus point into view if needed.
 *
 * @param {Selection} selection
 */

function scrollToSelection(selection) {
  if (!selection.anchorNode) return;

  var window = (0, _getWindow2.default)(selection.anchorNode);
  var scroller = findScrollContainer(selection.anchorNode);
  var isWindow = scroller == window;
  var backward = (0, _selectionIsBackward2.default)(selection);
  var range = selection.getRangeAt(0);
  var rect = range.getBoundingClientRect();
  var width = void 0;
  var height = void 0;
  var yOffset = void 0;
  var xOffset = void 0;

  if (isWindow) {
    var innerWidth = scroller.innerWidth,
        innerHeight = scroller.innerHeight,
        pageYOffset = scroller.pageYOffset,
        pageXOffset = scroller.pageXOffset;

    width = innerWidth;
    height = innerHeight;
    yOffset = pageYOffset;
    xOffset = pageXOffset;
  } else {
    var offsetWidth = scroller.offsetWidth,
        offsetHeight = scroller.offsetHeight,
        scrollTop = scroller.scrollTop,
        scrollLeft = scroller.scrollLeft;

    width = offsetWidth;
    height = offsetHeight;
    yOffset = scrollTop;
    xOffset = scrollLeft;
  }

  var top = (backward ? rect.top : rect.bottom) + yOffset;
  var left = (backward ? rect.left : rect.right) + xOffset;

  var x = left < yOffset || width + xOffset < left ? left - width / 2 : xOffset;

  var y = top < yOffset || height + yOffset < top ? top - height / 2 : yOffset;

  if (isWindow) {
    window.scrollTo(x, y);
  } else {
    scroller.scrollTop = y;
    scroller.scrollLeft = x;
  }
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = scrollToSelection;