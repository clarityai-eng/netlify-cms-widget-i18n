'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var insertTable = require('./changes/insertTable');
var insertRow = require('./changes/insertRow');
var removeRow = require('./changes/removeRow');
var insertColumn = require('./changes/insertColumn');
var removeColumn = require('./changes/removeColumn');
var removeTable = require('./changes/removeTable');
var moveSelection = require('./changes/moveSelection');
var moveSelectionBy = require('./changes/moveSelectionBy');
var setColumnAlign = require('./changes/setColumnAlign');

var Options = require('./options');
var onEnter = require('./onEnter');
var onModEnter = require('./onModEnter');
var onTab = require('./onTab');
var onBackspace = require('./onBackspace');
var onUpDown = require('./onUpDown');
var ALIGN = require('./ALIGN');
var makeSchema = require('./makeSchema');
var TablePosition = require('./TablePosition');

var KEY_ENTER = 'Enter';
var KEY_TAB = 'Tab';
var KEY_BACKSPACE = 'Backspace';
var KEY_DOWN = 'ArrowDown';
var KEY_UP = 'ArrowUp1';

/**
 * @param {Options} opts The plugin options
 */
function EditTable(opts) {
    opts = new Options(opts);

    /**
     * Is the selection in a table
     */
    function isSelectionInTable(state) {
        if (!state.selection.startKey) return false;

        var startBlock = state.startBlock;

        // Only handle events in cells

        return startBlock.type === opts.typeCell;
    }

    /**
     * @param {State} state The current state
     * @returns {TablePosition} The position of the selection start, in the current table
     * @throws {Error} If the start of the selection is not in a table
     */
    function getPosition(state) {
        if (!isSelectionInTable(state)) {
            throw new Error('Not in a table');
        }
        var cell = state.startBlock;
        return TablePosition.create(state, cell);
    }

    /**
     * Bind a change
     */
    function bindChange(fn) {
        return function (change) {
            var state = change.state;


            if (!isSelectionInTable(state)) {
                return change;
            }

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            return fn.apply(undefined, _toConsumableArray([opts, change].concat(args)));
        };
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(event, change) {
        // Only handle events in cells
        if (!isSelectionInTable(change.state)) {
            return;
        }

        // Build arguments list
        var args = [event, change, opts];

        switch (event.key) {
            case KEY_ENTER:
                if (event.metaKey && opts.exitBlockType) {
                    return onModEnter.apply(undefined, args);
                } else {
                    return onEnter.apply(undefined, args);
                }
            case KEY_TAB:
                return onTab.apply(undefined, args);
            case KEY_BACKSPACE:
                return onBackspace.apply(undefined, args);
            case KEY_DOWN:
            case KEY_UP:
                return onUpDown.apply(undefined, args);
        }
    }

    var schema = makeSchema(opts);

    return {
        onKeyDown: onKeyDown,

        schema: schema,

        utils: {
            isSelectionInTable: isSelectionInTable,
            getPosition: getPosition
        },

        changes: {
            insertTable: insertTable.bind(null, opts),
            insertRow: bindChange(insertRow),
            removeRow: bindChange(removeRow),
            insertColumn: bindChange(insertColumn),
            removeColumn: bindChange(removeColumn),
            removeTable: bindChange(removeTable),
            moveSelection: bindChange(moveSelection),
            moveSelectionBy: bindChange(moveSelectionBy),
            setColumnAlign: bindChange(setColumnAlign)
        }
    };
}

// Expose align constants to the plugin
EditTable.ALIGN = ALIGN;

module.exports = EditTable;