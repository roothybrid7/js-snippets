/**
 * utils.js - Utility mixins.
 *
 * requires: _(underscore.js).
 */

/**
 * Immediate function for initializing core mixins.
 *
 * @param {window} global window object.
 * @param {Object} options option parameters.
 */
(function(global, options) {
  'use strict';

  /**
   * namespace
   */
  var rootNs = global.getRootNamespace();
  var mixins = rootNs.namespace('mixins.mvc.utils');

  /**
   * Execute function commands list.
   *
   * @param {Array.<Function>} fnList Function array list.
   */
  mixins.Core = {
    executeCommands: function(fnList) {
      _.each(fnList, function(fn) {
        this[fn].apply(this);
      }, this);
    }
  };

  return mixins;
}(this));
