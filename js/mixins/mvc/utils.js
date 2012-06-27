/**
 * utils.js - Utility mixins.
 */

/**
 * Immediate function for initializing core mixins.
 *
 * @param {window} global window object.
 */
(function(global) {
  'use strict';

  /**
   * namespace
   */
  var rootNs = global.getRootNamespace();
  var module = rootNs.namespace('mixins.mvc.utils');

  /**
   * Execute function commands list.
   *
   * @param {Array.<Function>} fnList Function array list.
   */
  module.Core = {
    executeCommands: function(fnList) {
      _.chain(fnList).compact().each(function(fn) {
        this[fn].apply(this);
      }, this);
    }
  };

  return module;
}(this));
