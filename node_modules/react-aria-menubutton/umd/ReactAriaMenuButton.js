(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactAriaMenuButton"] = factory(require("react"), require("react-dom"));
	else
		root["ReactAriaMenuButton"] = factory(root["React"], root["ReactDOM"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(11)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(14)();
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (a, b, reserved) {
  // This will get id, className, style, etc.
  for (var x in b) {
    if (!b.hasOwnProperty(x)) continue;
    if (reserved[x]) continue;
    a[x] = b[x];
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var registeredManagers = {};

var errorCommon = 'a menu outside a mounted Wrapper with an id, or a menu that does not exist';

function registerManager(menuId, manager) {
  registeredManagers[menuId] = manager;
}

function unregisterManager(menuId) {
  delete registeredManagers[menuId];
}

function openMenu(menuId, openOptions) {
  var manager = registeredManagers[menuId];
  if (!manager) throw new Error('Cannot open ' + errorCommon);
  manager.openMenu(openOptions);
}

function closeMenu(menuId, closeOptions) {
  var manager = registeredManagers[menuId];
  if (!manager) throw new Error('Cannot close ' + errorCommon);
  manager.closeMenu(closeOptions);
}

module.exports = {
  registerManager: registerManager,
  unregisterManager: unregisterManager,
  openMenu: openMenu,
  closeMenu: closeMenu
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(3);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var externalStateControl = __webpack_require__(6);

module.exports = {
  Wrapper: __webpack_require__(10),
  Button: __webpack_require__(17),
  Menu: __webpack_require__(18),
  MenuItem: __webpack_require__(20),
  openMenu: externalStateControl.openMenu,
  closeMenu: externalStateControl.closeMenu
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(0);
var PropTypes = __webpack_require__(1);
var createManager = __webpack_require__(15);
var specialAssign = __webpack_require__(2);

var checkedProps = {
  children: PropTypes.node.isRequired,
  onMenuToggle: PropTypes.func,
  onSelection: PropTypes.func,
  closeOnSelection: PropTypes.bool,
  tag: PropTypes.string
};

var AriaMenuButtonWrapper = function (_React$Component) {
  _inherits(AriaMenuButtonWrapper, _React$Component);

  function AriaMenuButtonWrapper() {
    _classCallCheck(this, AriaMenuButtonWrapper);

    return _possibleConstructorReturn(this, (AriaMenuButtonWrapper.__proto__ || Object.getPrototypeOf(AriaMenuButtonWrapper)).apply(this, arguments));
  }

  _createClass(AriaMenuButtonWrapper, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        ambManager: this.manager
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.manager = createManager({
        onMenuToggle: this.props.onMenuToggle,
        onSelection: this.props.onSelection,
        closeOnSelection: this.props.closeOnSelection,
        id: this.props.id
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var wrapperProps = {};
      specialAssign(wrapperProps, this.props, checkedProps);
      return React.createElement(this.props.tag, wrapperProps, this.props.children);
    }
  }]);

  return AriaMenuButtonWrapper;
}(React.Component);

AriaMenuButtonWrapper.propTypes = checkedProps;
AriaMenuButtonWrapper.defaultProps = { tag: 'div' };
AriaMenuButtonWrapper.childContextTypes = {
  ambManager: PropTypes.object
};


module.exports = AriaMenuButtonWrapper;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(3);
var invariant = __webpack_require__(4);
var warning = __webpack_require__(7);
var assign = __webpack_require__(12);

var ReactPropTypesSecret = __webpack_require__(5);
var checkPropTypes = __webpack_require__(13);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(4);
  var warning = __webpack_require__(7);
  var ReactPropTypesSecret = __webpack_require__(5);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(3);
var invariant = __webpack_require__(4);
var ReactPropTypesSecret = __webpack_require__(5);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ReactDOM = __webpack_require__(8);
var createFocusGroup = __webpack_require__(16);
var externalStateControl = __webpack_require__(6);

var focusGroupOptions = {
  wrap: true,
  stringSearch: true
};

var protoManager = {
  init: function init(options) {
    this.options = options || {};

    if (typeof this.options.closeOnSelection === 'undefined') {
      this.options.closeOnSelection = true;
    }

    if (this.options.id) {
      externalStateControl.registerManager(this.options.id, this);
    }

    this.handleBlur = handleBlur.bind(this);
    this.handleSelection = handleSelection.bind(this);
    this.handleMenuKey = handleMenuKey.bind(this);

    // "With focus on the drop-down menu, the Up and Down Arrow
    // keys move focus within the menu items, "wrapping" at the top and bottom."
    // "Typing a letter (printable character) key moves focus to the next
    // instance of a visible node whose title begins with that printable letter."
    //
    // All of the above is handled by focus-group.
    this.focusGroup = createFocusGroup(focusGroupOptions);

    // These component references are added when the relevant components mount
    this.button = null;
    this.menu = null;

    // State trackers
    this.isOpen = false;
  },
  focusItem: function focusItem(index) {
    this.focusGroup.focusNodeAtIndex(index);
  },
  addItem: function addItem(item) {
    this.focusGroup.addMember(item);
  },
  clearItems: function clearItems() {
    this.focusGroup.clearMembers();
  },
  handleButtonNonArrowKey: function handleButtonNonArrowKey(event) {
    this.focusGroup._handleUnboundKey(event);
  },
  destroy: function destroy() {
    this.button = null;
    this.menu = null;
    this.focusGroup.deactivate();
    clearTimeout(this.blurTimer);
    clearTimeout(this.moveFocusTimer);
  },
  update: function update() {
    this.menu.setState({ isOpen: this.isOpen });
    this.button.setState({ menuOpen: this.isOpen });
    this.options.onMenuToggle && this.options.onMenuToggle({ isOpen: this.isOpen });
  },
  openMenu: function openMenu(openOptions) {
    if (this.isOpen) return;
    openOptions = openOptions || {};
    if (openOptions.focusMenu === undefined) {
      openOptions.focusMenu = true;
    }
    this.isOpen = true;
    this.update();
    this.focusGroup.activate();
    if (openOptions.focusMenu) {
      var self = this;
      this.moveFocusTimer = setTimeout(function () {
        self.focusItem(0);
      }, 0);
    }
  },
  closeMenu: function closeMenu(closeOptions) {
    if (!this.isOpen) return;
    closeOptions = closeOptions || {};
    this.isOpen = false;
    this.update();
    if (closeOptions.focusButton) {
      ReactDOM.findDOMNode(this.button).focus();
    }
  },
  toggleMenu: function toggleMenu(closeOptions, openOptions) {
    closeOptions = closeOptions || {};
    openOptions = openOptions || {};
    if (this.isOpen) {
      this.closeMenu(closeOptions);
    } else {
      this.openMenu(openOptions);
    }
  }
};

function handleBlur() {
  var self = this;
  self.blurTimer = setTimeout(function () {
    var buttonNode = ReactDOM.findDOMNode(self.button);
    if (!buttonNode) return;
    var activeEl = buttonNode.ownerDocument.activeElement;
    if (buttonNode && activeEl === buttonNode) return;
    var menuNode = ReactDOM.findDOMNode(self.menu);
    if (menuNode === activeEl) {
      self.focusItem(0);
      return;
    }
    if (menuNode && menuNode.contains(activeEl)) return;
    if (self.isOpen) self.closeMenu({ focusButton: false });
  }, 0);
}

function handleSelection(value, event) {
  if (this.options.closeOnSelection) this.closeMenu({ focusButton: true });
  if (this.options.onSelection) this.options.onSelection(value, event);
}

function handleMenuKey(event) {
  // "With focus on the drop-down menu, pressing Escape closes
  // the menu and returns focus to the button.
  if (this.isOpen && event.key === 'Escape') {
    event.preventDefault();
    this.closeMenu({ focusButton: true });
  }
}

module.exports = function (options) {
  var newManager = Object.create(protoManager);
  newManager.init(options);
  return newManager;
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

function FocusGroup(options) {
  options = options || {};
  var userKeybindings = options.keybindings || {};
  this._settings = {
    keybindings: {
      next: (userKeybindings.next) || { keyCode: 40 },
      prev: (userKeybindings.prev) || { keyCode: 38 },
      first: userKeybindings.first,
      last: userKeybindings.last,
    },
    wrap: options.wrap,
    stringSearch: options.stringSearch,
    stringSearchDelay: 800
  };

  // Construct a keybinding lookup that will be more useful later
  this._keybindingsLookup = [];
  var action;
  var eventMatchers
  for (action in this._settings.keybindings) {
    eventMatchers = this._settings.keybindings[action];
    if (!eventMatchers) continue;
    [].concat(eventMatchers).forEach(function(eventMatcher) {
      eventMatcher.metaKey = eventMatcher.metaKey || false;
      eventMatcher.ctrlKey = eventMatcher.ctrlKey || false;
      eventMatcher.altKey = eventMatcher.altKey || false;
      eventMatcher.shiftKey = eventMatcher.shiftKey || false;
      this._keybindingsLookup.push({
        action: action,
        eventMatcher: eventMatcher
      });
    }.bind(this));
  }

  this._searchString = '';
  this._members = [];
  if (options.members) this.setMembers(options.members);
  this._boundHandleKeydownEvent = this._handleKeydownEvent.bind(this);
}

FocusGroup.prototype.activate = function() {
  // Use capture in case other libraries might grab it first -- i.e. React
  document.addEventListener('keydown', this._boundHandleKeydownEvent, true);
  return this;
};

FocusGroup.prototype.deactivate = function() {
  document.removeEventListener('keydown', this._boundHandleKeydownEvent, true);
  this._clearSearchStringRefreshTimer();
  return this;
};

FocusGroup.prototype._handleKeydownEvent = function(event) {
  // Only respond to keyboard events when
  // focus is already within the focus-group
  var activeElementIndex = this._getActiveElementIndex();
  if (activeElementIndex === -1) return;

  // See if the event matches any registered keybinds
  var eventBound = false;
  this._keybindingsLookup.forEach(function(keybinding) {
    if (!matchesEvent(keybinding.eventMatcher, event)) return;
    eventBound = true;
    event.preventDefault();
    switch (keybinding.action) {
      case 'next':
        this.moveFocusForward();
        break;
      case 'prev':
        this.moveFocusBack();
        break;
      case 'first':
        this.moveFocusToFirst();
        break;
      case 'last':
        this.moveFocusToLast();
        break;
      default: return;
    }
  }.bind(this));

  if (!eventBound) {
    this._handleUnboundKey(event);
  }
};

FocusGroup.prototype.moveFocusForward = function() {
  var activeElementIndex = this._getActiveElementIndex();
  var targetIndex;
  if (activeElementIndex < this._members.length - 1) {
    targetIndex = activeElementIndex + 1;
  } else if (this._settings.wrap) {
    targetIndex = 0;
  } else {
    targetIndex = activeElementIndex;
  }
  this.focusNodeAtIndex(targetIndex);
  return targetIndex;
};

FocusGroup.prototype.moveFocusBack = function() {
  var activeElementIndex = this._getActiveElementIndex();
  var targetIndex;
  if (activeElementIndex > 0) {
    targetIndex = activeElementIndex - 1;
  } else if (this._settings.wrap) {
    targetIndex = this._members.length - 1;
  } else {
    targetIndex = activeElementIndex;
  }
  this.focusNodeAtIndex(targetIndex);
  return targetIndex;
};

FocusGroup.prototype.moveFocusToFirst = function() {
  this.focusNodeAtIndex(0);
};

FocusGroup.prototype.moveFocusToLast = function() {
  this.focusNodeAtIndex(this._members.length - 1);
};

FocusGroup.prototype._handleUnboundKey = function(event) {
  if (!this._settings.stringSearch) return;

  // While a string search is underway, ignore spaces
  // and prevent the default space-key behavior
  if (this._searchString !== '' && (event.key === ' ' || event.keyCode === 32)) {
    event.preventDefault();
    return -1;
  }

  // Only respond to letter keys
  if (!isLetterKeyCode(event.keyCode)) return -1;

  // If the letter key is part of a key combo,
  // let it do whatever it was going to do
  if (event.ctrlKey || event.metaKey || event.altKey) return -1;

  event.preventDefault();

  this._addToSearchString(String.fromCharCode(event.keyCode));
  this._runStringSearch();
};

FocusGroup.prototype._clearSearchString = function() {
  this._searchString = '';
};

FocusGroup.prototype._addToSearchString = function(letter) {
  // Always store the lowercase version of the letter
  this._searchString += letter.toLowerCase();
};

FocusGroup.prototype._startSearchStringRefreshTimer = function() {
  var self = this;
  this._clearSearchStringRefreshTimer();
  this._stringSearchTimer = setTimeout(function() {
    self._clearSearchString();
  }, this._settings.stringSearchDelay);
};

FocusGroup.prototype._clearSearchStringRefreshTimer = function() {
  clearTimeout(this._stringSearchTimer);
};

FocusGroup.prototype._runStringSearch = function() {
  this._startSearchStringRefreshTimer();
  this.moveFocusByString(this._searchString);
};

FocusGroup.prototype.moveFocusByString = function(str) {
  var member;
  for (var i = 0, l = this._members.length; i < l; i++) {
    member = this._members[i];
    if (!member.text) continue;

    if (member.text.indexOf(str) === 0) {
      return focusNode(member.node);
    }
  }
};

FocusGroup.prototype._findIndexOfNode = function(searchNode) {
  for (var i = 0, l = this._members.length; i < l; i++) {
    if (this._members[i].node === searchNode) {
      return i;
    }
  }
  return -1;
};

FocusGroup.prototype._getActiveElementIndex = function() {
  return this._findIndexOfNode(document.activeElement);
};

FocusGroup.prototype.focusNodeAtIndex = function(index) {
  var member = this._members[index];
  if (member) focusNode(member.node);
  return this;
};

FocusGroup.prototype.addMember = function(memberData, index) {
  var node = memberData.node || memberData;
  var nodeText = memberData.text || node.getAttribute('data-focus-group-text') || node.textContent || '';

  this._checkNode(node);

  var cleanedNodeText = nodeText.replace(/[\W_]/g, '').toLowerCase();
  var member = {
    node: node,
    text: cleanedNodeText,
  };

  if (index !== null && index !== undefined) {
    this._members.splice(index, 0, member);
  } else {
    this._members.push(member);
  }
  return this;
};

FocusGroup.prototype.removeMember = function(member) {
  var removalIndex = (typeof member === 'number')
    ? member
    : this._findIndexOfNode(member);
  if (removalIndex === -1) return;
  this._members.splice(removalIndex, 1);
  return this;
};

FocusGroup.prototype.clearMembers = function() {
  this._members = [];
  return this;
};

FocusGroup.prototype.setMembers = function(nextMembers) {
  this.clearMembers();
  for (var i = 0, l = nextMembers.length; i < l; i++) {
    this.addMember(nextMembers[i]);
  }
  return this;
};

FocusGroup.prototype.getMembers = function() {
  return this._members;
};

FocusGroup.prototype._checkNode = function(node) {
  if (!node.nodeType || node.nodeType !== window.Node.ELEMENT_NODE) {
    throw new Error('focus-group: only DOM nodes allowed');
  }
  return node;
};

function matchesEvent(matcher, event) {
  for (var key in matcher) {
    if (event[key] !== undefined && matcher[key] !== event[key]) return false;
  }
  return true;
}

function isLetterKeyCode(keyCode) {
  return keyCode >= 65 && keyCode <= 90;
}

function focusNode(node) {
  if (!node || !node.focus) return;
  node.focus();
  if (node.tagName.toLowerCase() === 'input') node.select();
}

module.exports = function createFocusGroup(options) {
  return new FocusGroup(options);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(0);
var PropTypes = __webpack_require__(1);
var specialAssign = __webpack_require__(2);

var checkedProps = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  tag: PropTypes.string
};

var AriaMenuButtonButton = function (_React$Component) {
  _inherits(AriaMenuButtonButton, _React$Component);

  function AriaMenuButtonButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AriaMenuButtonButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AriaMenuButtonButton.__proto__ || Object.getPrototypeOf(AriaMenuButtonButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleKeyDown = function (event) {
      if (_this.props.disabled) return;

      var ambManager = _this.context.ambManager;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!ambManager.isOpen) {
            ambManager.openMenu();
          } else {
            ambManager.focusItem(0);
          }
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          ambManager.toggleMenu();
          break;
        case 'Escape':
          ambManager.handleMenuKey(event);
          break;
        default:
          // (Potential) letter keys
          ambManager.handleButtonNonArrowKey(event);
      }
    }, _this.handleClick = function () {
      if (_this.props.disabled) return;
      _this.context.ambManager.toggleMenu({}, { focusMenu: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AriaMenuButtonButton, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.context.ambManager.button = this;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.ambManager.destroy();
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;

      var buttonProps = {
        // "The menu button itself has a role of button."
        role: 'button',
        tabIndex: props.disabled ? '' : '0',
        // "The menu button has an aria-haspopup property, set to true."
        'aria-haspopup': true,
        'aria-expanded': this.context.ambManager.isOpen,
        'aria-disabled': props.disabled,
        onKeyDown: this.handleKeyDown,
        onClick: this.handleClick,
        onBlur: this.context.ambManager.handleBlur
      };

      specialAssign(buttonProps, props, checkedProps);

      return React.createElement(props.tag, buttonProps, props.children);
    }
  }]);

  return AriaMenuButtonButton;
}(React.Component);

AriaMenuButtonButton.propTypes = checkedProps;
AriaMenuButtonButton.contextTypes = {
  ambManager: PropTypes.object.isRequired
};
AriaMenuButtonButton.defaultProps = { tag: 'span' };


module.exports = AriaMenuButtonButton;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(8);
var PropTypes = __webpack_require__(1);
var createTapListener = __webpack_require__(19);
var specialAssign = __webpack_require__(2);

var checkedProps = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  tag: PropTypes.string
};

module.exports = (_temp2 = _class = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.addTapListener = function () {
      var el = ReactDOM.findDOMNode(_this);
      if (!el) return;
      var doc = el.ownerDocument;
      if (!doc) return;
      _this.tapListener = createTapListener(doc.documentElement, _this.handleTap);
    }, _this.handleTap = function (event) {
      if (ReactDOM.findDOMNode(_this).contains(event.target)) return;
      if (ReactDOM.findDOMNode(_this.context.ambManager.button).contains(event.target)) return;
      _this.context.ambManager.closeMenu();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_class, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.context.ambManager.menu = this;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var ambManager = this.context.ambManager;
      if (ambManager.isOpen && !this.tapListener) {
        this.addTapListener();
      } else if (!ambManager.isOpen && this.tapListener) {
        this.tapListener.remove();
        delete this.tapListener;
      }

      if (!ambManager.isOpen) {
        // Clear the ambManager's items, so they
        // can be reloaded next time this menu opens
        ambManager.clearItems();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.tapListener) this.tapListener.remove();
      this.context.ambManager.destroy();
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var ambManager = this.context.ambManager;

      var childrenToRender = function () {
        if (typeof props.children === 'function') {
          return props.children({ isOpen: ambManager.isOpen });
        }
        if (ambManager.isOpen) return props.children;
        return false;
      }();

      if (!childrenToRender) return false;

      var menuProps = {
        onKeyDown: ambManager.handleMenuKey,
        role: 'menu',
        onBlur: ambManager.handleBlur,
        tabIndex: -1
      };

      specialAssign(menuProps, props, checkedProps);

      return React.createElement(props.tag, menuProps, childrenToRender);
    }
  }]);

  return _class;
}(React.Component), _class.propTypes = checkedProps, _class.defaultProps = { tag: 'div' }, _class.contextTypes = {
  ambManager: PropTypes.object.isRequired
}, _temp2);

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function createTapListener(el, callback, useCapture) {
  var startX = 0;
  var startY = 0;
  var touchStarted = false;
  var touchMoved = false;
  // Assume that if a touchstart event initiates, the user is
  // using touch and click events should be ignored.
  // If this isn't done, touch-clicks will fire the callback
  // twice: once on touchend, once on the subsequent "click".
  var usingTouch = false;

  el.addEventListener('click', handleClick, useCapture);
  el.addEventListener('touchstart', handleTouchstart, useCapture);

  function handleClick(e) {
    if (usingTouch) return;
    callback(e);
  }

  function handleTouchstart(e) {
    usingTouch = true;

    if (touchStarted) return;
    touchStarted = true;

    el.addEventListener('touchmove', handleTouchmove, useCapture);
    el.addEventListener('touchend', handleTouchend, useCapture);
    el.addEventListener('touchcancel', handleTouchcancel, useCapture);

    touchMoved = false;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }

  function handleTouchmove(e) {
    if (touchMoved) return;

    if (
      Math.abs(e.touches[0].clientX - startX) <= 10
      && Math.abs(e.touches[0].clientY - startY) <= 10
    ) return;

    touchMoved = true;
  }

  function handleTouchend(e) {
    touchStarted = false;
    removeSecondaryTouchListeners();
    if (!touchMoved) {
      callback(e);
    }
  }

  function handleTouchcancel() {
    touchStarted = false;
    touchMoved = false;
    startX = 0;
    startY = 0;
  }

  function removeSecondaryTouchListeners() {
    el.removeEventListener('touchmove', handleTouchmove, useCapture);
    el.removeEventListener('touchend', handleTouchend, useCapture);
    el.removeEventListener('touchcancel', handleTouchcancel, useCapture);
  }

  function removeTapListener() {
    el.removeEventListener('click', handleClick, useCapture);
    el.removeEventListener('touchstart', handleTouchstart, useCapture);
    removeSecondaryTouchListeners();
  }

  return {
    remove: removeTapListener,
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(0);
var PropTypes = __webpack_require__(1);
var specialAssign = __webpack_require__(2);

var checkedProps = {
  children: PropTypes.node.isRequired,
  tag: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.any
};

var AriaMenuButtonMenuItem = function (_React$Component) {
  _inherits(AriaMenuButtonMenuItem, _React$Component);

  function AriaMenuButtonMenuItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AriaMenuButtonMenuItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AriaMenuButtonMenuItem.__proto__ || Object.getPrototypeOf(AriaMenuButtonMenuItem)).call.apply(_ref, [this].concat(args))), _this), _this.handleKeyDown = function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      if (_this.props.tag === 'a' && _this.props.href) return;
      event.preventDefault();
      _this.selectItem(event);
    }, _this.selectItem = function (event) {
      // If there's no value, we'll send the child
      var value = typeof _this.props.value !== 'undefined' ? _this.props.value : _this.props.children;
      _this.context.ambManager.handleSelection(value, event);
    }, _this.registerNode = function (node) {
      _this.node = node;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AriaMenuButtonMenuItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.context.ambManager.addItem({
        node: this.node,
        text: this.props.text
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var menuItemProps = {
        onClick: this.selectItem,
        onKeyDown: this.handleKeyDown,
        role: 'menuitem',
        tabIndex: '-1',
        ref: this.registerNode
      };

      specialAssign(menuItemProps, this.props, checkedProps);

      return React.createElement(this.props.tag, menuItemProps, this.props.children);
    }
  }]);

  return AriaMenuButtonMenuItem;
}(React.Component);

AriaMenuButtonMenuItem.propTypes = checkedProps;
AriaMenuButtonMenuItem.defaultProps = { tag: 'div' };
AriaMenuButtonMenuItem.contextTypes = {
  ambManager: PropTypes.object.isRequired
};


module.exports = AriaMenuButtonMenuItem;

/***/ })
/******/ ]);
});