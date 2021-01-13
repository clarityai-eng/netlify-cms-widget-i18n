(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SlateSoftBreak = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});