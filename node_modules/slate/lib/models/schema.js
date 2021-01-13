'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _isPlainObject = require('is-plain-object');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _mergeWith = require('lodash/mergeWith');

var _mergeWith2 = _interopRequireDefault(_mergeWith);

var _immutable = require('immutable');

var _coreSchemaRules = require('../constants/core-schema-rules');

var _coreSchemaRules2 = _interopRequireDefault(_coreSchemaRules);

var _modelTypes = require('../constants/model-types');

var _modelTypes2 = _interopRequireDefault(_modelTypes);

var _stack = require('./stack');

var _stack2 = _interopRequireDefault(_stack);

var _memoize = require('../utils/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Validation failure reasons.
 *
 * @type {Object}
 */

var CHILD_KIND_INVALID = 'child_kind_invalid';
var CHILD_REQUIRED = 'child_required';
var CHILD_TYPE_INVALID = 'child_type_invalid';
var CHILD_UNKNOWN = 'child_unknown';
var FIRST_CHILD_KIND_INVALID = 'first_child_kind_invalid';
var FIRST_CHILD_TYPE_INVALID = 'first_child_type_invalid';
var LAST_CHILD_KIND_INVALID = 'last_child_kind_invalid';
var LAST_CHILD_TYPE_INVALID = 'last_child_type_invalid';
var NODE_DATA_INVALID = 'node_data_invalid';
var NODE_IS_VOID_INVALID = 'node_is_void_invalid';
var NODE_MARK_INVALID = 'node_mark_invalid';
var NODE_TEXT_INVALID = 'node_text_invalid';
var PARENT_KIND_INVALID = 'parent_kind_invalid';
var PARENT_TYPE_INVALID = 'parent_type_invalid';

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = (0, _debug2.default)('slate:schema');

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS = {
  stack: _stack2.default.create(),
  document: {},
  blocks: {},
  inlines: {}
};

/**
 * Schema.
 *
 * @type {Schema}
 */

var Schema = function (_Record) {
  _inherits(Schema, _Record);

  function Schema() {
    _classCallCheck(this, Schema);

    return _possibleConstructorReturn(this, (Schema.__proto__ || Object.getPrototypeOf(Schema)).apply(this, arguments));
  }

  _createClass(Schema, [{
    key: 'getRule',


    /**
     * Get the rule for an `object`.
     *
     * @param {Mixed} object
     * @return {Object}
     */

    value: function getRule(object) {
      switch (object.kind) {
        case 'document':
          return this.document;
        case 'block':
          return this.blocks[object.type];
        case 'inline':
          return this.inlines[object.type];
      }
    }

    /**
     * Get a dictionary of the parent rule validations by child type.
     *
     * @return {Object|Null}
     */

  }, {
    key: 'getParentRules',
    value: function getParentRules() {
      var blocks = this.blocks,
          inlines = this.inlines;

      var parents = {};

      for (var key in blocks) {
        var rule = blocks[key];
        if (rule.parent == null) continue;
        parents[key] = rule;
      }

      for (var _key in inlines) {
        var _rule = inlines[_key];
        if (_rule.parent == null) continue;
        parents[_key] = _rule;
      }

      return Object.keys(parents).length == 0 ? null : parents;
    }

    /**
     * Fail validation by returning a normalizing change function.
     *
     * @param {String} reason
     * @param {Object} context
     * @return {Function}
     */

  }, {
    key: 'fail',
    value: function fail(reason, context) {
      var _this2 = this;

      return function (change) {
        debug('normalizing', { reason: reason, context: context });
        var rule = context.rule;

        var count = change.operations.length;
        if (rule.normalize) rule.normalize(change, reason, context);
        if (change.operations.length > count) return;
        _this2.normalize(change, reason, context);
      };
    }

    /**
     * Normalize an invalid value with `reason` and `context`.
     *
     * @param {Change} change
     * @param {String} reason
     * @param {Mixed} context
     */

  }, {
    key: 'normalize',
    value: function normalize(change, reason, context) {
      switch (reason) {
        case CHILD_KIND_INVALID:
        case CHILD_TYPE_INVALID:
        case CHILD_UNKNOWN:
        case FIRST_CHILD_KIND_INVALID:
        case FIRST_CHILD_TYPE_INVALID:
        case LAST_CHILD_KIND_INVALID:
        case LAST_CHILD_TYPE_INVALID:
          {
            var child = context.child,
                node = context.node;

            return child.kind == 'text' && node.kind == 'block' && node.nodes.size == 1 ? change.removeNodeByKey(node.key) : change.removeNodeByKey(child.key);
          }

        case CHILD_REQUIRED:
        case NODE_TEXT_INVALID:
        case PARENT_KIND_INVALID:
        case PARENT_TYPE_INVALID:
          {
            var _node = context.node;

            return _node.kind == 'document' ? _node.nodes.forEach(function (child) {
              return change.removeNodeByKey(child.key);
            }) : change.removeNodeByKey(_node.key);
          }

        case NODE_DATA_INVALID:
          {
            var _node2 = context.node,
                key = context.key;

            return _node2.data.get(key) === undefined && _node2.kind != 'document' ? change.removeNodeByKey(_node2.key) : change.setNodeByKey(_node2.key, { data: _node2.data.delete(key) });
          }

        case NODE_IS_VOID_INVALID:
          {
            var _node3 = context.node;

            return change.setNodeByKey(_node3.key, { isVoid: !_node3.isVoid });
          }

        case NODE_MARK_INVALID:
          {
            var _node4 = context.node,
                mark = context.mark;

            return _node4.getTexts().forEach(function (t) {
              return change.removeMarkByKey(t.key, 0, t.text.length, mark);
            });
          }
      }
    }

    /**
     * Validate a `node` with the schema, returning a function that will fix the
     * invalid node, or void if the node is valid.
     *
     * @param {Node} node
     * @return {Function|Void}
     */

  }, {
    key: 'validateNode',
    value: function validateNode(node) {
      var ret = this.stack.find('validateNode', node);
      if (ret) return ret;

      if (node.kind == 'text') return;

      var rule = this.getRule(node) || {};
      var parents = this.getParentRules();
      var ctx = { node: node, rule: rule };

      if (rule.isVoid != null) {
        if (node.isVoid != rule.isVoid) {
          return this.fail(NODE_IS_VOID_INVALID, ctx);
        }
      }

      if (rule.data != null) {
        for (var key in rule.data) {
          var fn = rule.data[key];
          var value = node.data.get(key);

          if (!fn(value)) {
            return this.fail(NODE_DATA_INVALID, _extends({}, ctx, { key: key, value: value }));
          }
        }
      }

      if (rule.marks != null) {
        var marks = node.getMarks().toArray();

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = marks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var mark = _step.value;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = rule.marks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var def = _step2.value;

                if (def.type != mark.type) {
                  return this.fail(NODE_MARK_INVALID, _extends({}, ctx, { mark: mark }));
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      if (rule.text != null) {
        var text = node.text;


        if (!rule.text.test(text)) {
          return this.fail(NODE_TEXT_INVALID, _extends({}, ctx, { text: text }));
        }
      }

      if (rule.first != null) {
        var _rule$first = rule.first,
            kinds = _rule$first.kinds,
            types = _rule$first.types;

        var child = node.nodes.first();

        if (child && kinds && !kinds.includes(child.kind)) {
          return this.fail(FIRST_CHILD_KIND_INVALID, _extends({}, ctx, { child: child }));
        }

        if (child && types && !types.includes(child.type)) {
          return this.fail(FIRST_CHILD_TYPE_INVALID, _extends({}, ctx, { child: child }));
        }
      }

      if (rule.last != null) {
        var _rule$last = rule.last,
            _kinds = _rule$last.kinds,
            _types = _rule$last.types;

        var _child = node.nodes.last();

        if (_child && _kinds && !_kinds.includes(_child.kind)) {
          return this.fail(LAST_CHILD_KIND_INVALID, _extends({}, ctx, { child: _child }));
        }

        if (_child && _types && !_types.includes(_child.type)) {
          return this.fail(LAST_CHILD_TYPE_INVALID, _extends({}, ctx, { child: _child }));
        }
      }

      if (rule.nodes != null || parents != null) {
        var nextDef = function nextDef() {
          offset = offset == null ? null : 0;
          _def = defs.shift();
          min = _def && (_def.min == null ? 0 : _def.min);
          max = _def && (_def.max == null ? Infinity : _def.max);
          return !!_def;
        };

        var nextChild = function nextChild() {
          index = index == null ? 0 : index + 1;
          offset = offset == null ? 0 : offset + 1;
          _child2 = children[index];
          if (max != null && offset == max) nextDef();
          return !!_child2;
        };

        var children = node.nodes.toArray();
        var defs = rule.nodes != null ? rule.nodes.slice() : [];

        var offset = void 0;
        var min = void 0;
        var index = void 0;
        var _def = void 0;
        var max = void 0;
        var _child2 = void 0;

        if (rule.nodes != null) {
          nextDef();
        }

        while (nextChild()) {
          if (parents != null && _child2.kind != 'text' && _child2.type in parents) {
            var r = parents[_child2.type];

            if (r.parent.kinds != null && !r.parent.kinds.includes(node.kind)) {
              return this.fail(PARENT_KIND_INVALID, { node: _child2, parent: node, rule: r });
            }

            if (r.parent.types != null && !r.parent.types.includes(node.type)) {
              return this.fail(PARENT_TYPE_INVALID, { node: _child2, parent: node, rule: r });
            }
          }

          if (rule.nodes != null) {
            if (!_def) {
              return this.fail(CHILD_UNKNOWN, _extends({}, ctx, { child: _child2, index: index }));
            }

            if (_def.kinds != null && !_def.kinds.includes(_child2.kind)) {
              if (offset >= min && nextDef()) continue;
              return this.fail(CHILD_KIND_INVALID, _extends({}, ctx, { child: _child2, index: index }));
            }

            if (_def.types != null && !_def.types.includes(_child2.type)) {
              if (offset >= min && nextDef()) continue;
              return this.fail(CHILD_TYPE_INVALID, _extends({}, ctx, { child: _child2, index: index }));
            }
          }
        }

        if (rule.nodes != null) {
          while (min != null) {
            if (offset < min) {
              return this.fail(CHILD_REQUIRED, _extends({}, ctx, { index: index }));
            }

            nextDef();
          }
        }
      }
    }

    /**
     * Return a JSON representation of the schema.
     *
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var object = {
        kind: this.kind,
        document: this.document,
        blocks: this.blocks,
        inlines: this.inlines
      };

      return object;
    }

    /**
     * Alias `toJS`.
     */

  }, {
    key: 'toJS',
    value: function toJS() {
      return this.toJSON();
    }
  }, {
    key: 'kind',


    /**
     * Get the kind.
     *
     * @return {String}
     */

    get: function get() {
      return 'schema';
    }
  }], [{
    key: 'create',


    /**
     * Create a new `Schema` with `attrs`.
     *
     * @param {Object|Schema} attrs
     * @return {Schema}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Schema.isSchema(attrs)) {
        return attrs;
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        return Schema.fromJSON(attrs);
      }

      throw new Error('`Schema.create` only accepts objects or schemas, but you passed it: ' + attrs);
    }

    /**
     * Create a `Schema` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Schema}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      if (Schema.isSchema(object)) {
        return object;
      }

      var plugins = object.plugins;


      if (object.rules) {
        throw new Error('Schemas in Slate have changed! They are no longer accept a `rules` property.');
      }

      if (object.nodes) {
        throw new Error('Schemas in Slate have changed! They are no longer accept a `nodes` property.');
      }

      if (!plugins) {
        plugins = [{ schema: object }];
      }

      var schema = resolveSchema(plugins);
      var stack = _stack2.default.create({ plugins: [].concat(_toConsumableArray(_coreSchemaRules2.default), _toConsumableArray(plugins)) });
      var ret = new Schema(_extends({}, schema, { stack: stack }));
      return ret;
    }

    /**
     * Alias `fromJS`.
     */

  }, {
    key: 'isSchema',


    /**
     * Check if `any` is a `Schema`.
     *
     * @param {Any} any
     * @return {Boolean}
     */

    value: function isSchema(any) {
      return !!(any && any[_modelTypes2.default.SCHEMA]);
    }
  }]);

  return Schema;
}((0, _immutable.Record)(DEFAULTS));

/**
 * Resolve a set of schema rules from an array of `plugins`.
 *
 * @param {Array} plugins
 * @return {Object}
 */

Schema.fromJS = Schema.fromJSON;
function resolveSchema() {
  var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var schema = {
    document: {},
    blocks: {},
    inlines: {}
  };

  plugins.slice().reverse().forEach(function (plugin) {
    if (!plugin.schema) return;

    if (plugin.schema.rules) {
      throw new Error('Schemas in Slate have changed! They are no longer accept a `rules` property.');
    }

    if (plugin.schema.nodes) {
      throw new Error('Schemas in Slate have changed! They are no longer accept a `nodes` property.');
    }

    var _plugin$schema = plugin.schema,
        _plugin$schema$docume = _plugin$schema.document,
        document = _plugin$schema$docume === undefined ? {} : _plugin$schema$docume,
        _plugin$schema$blocks = _plugin$schema.blocks,
        blocks = _plugin$schema$blocks === undefined ? {} : _plugin$schema$blocks,
        _plugin$schema$inline = _plugin$schema.inlines,
        inlines = _plugin$schema$inline === undefined ? {} : _plugin$schema$inline;

    var d = resolveDocumentRule(document);
    var bs = {};
    var is = {};

    for (var key in blocks) {
      bs[key] = resolveNodeRule('block', key, blocks[key]);
    }

    for (var _key2 in inlines) {
      is[_key2] = resolveNodeRule('inline', _key2, inlines[_key2]);
    }

    (0, _mergeWith2.default)(schema.document, d, customizer);
    (0, _mergeWith2.default)(schema.blocks, bs, customizer);
    (0, _mergeWith2.default)(schema.inlines, is, customizer);
  });

  return schema;
}

/**
 * Resolve a document rule `obj`.
 *
 * @param {Object} obj
 * @return {Object}
 */

function resolveDocumentRule(obj) {
  return _extends({
    data: {},
    nodes: null
  }, obj);
}

/**
 * Resolve a node rule with `type` from `obj`.
 *
 * @param {String} kind
 * @param {String} type
 * @param {Object} obj
 * @return {Object}
 */

function resolveNodeRule(kind, type, obj) {
  return _extends({
    data: {},
    isVoid: null,
    nodes: null,
    first: null,
    last: null,
    parent: null,
    text: null
  }, obj);
}

/**
 * A Lodash customizer for merging schema definitions. Special cases `kinds`
 * and `types` arrays to be unioned, and ignores new `null` values.
 *
 * @param {Mixed} target
 * @param {Mixed} source
 * @return {Array|Void}
 */

function customizer(target, source, key) {
  if (key == 'kinds' || key == 'types') {
    return target == null ? source : target.concat(source);
  } else {
    return source == null ? target : source;
  }
}

/**
 * Attach a pseudo-symbol for type checking.
 */

Schema.prototype[_modelTypes2.default.SCHEMA] = true;

/**
 * Memoize read methods.
 */

(0, _memoize2.default)(Schema.prototype, ['getParentRules'], {
  takesArguments: true
});

/**
 * Export.
 *
 * @type {Schema}
 */

exports.default = Schema;