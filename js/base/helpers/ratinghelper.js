/**
 * ratinghelper.js - Helper function for rating.
 *
 * requires: jQuery, Backbone, _(underscore.js).
 */

/**
 * Immediate function for Initializing mvc helper module.
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
  var helpers = rootNs.namespace('base.helpers');

  var RATING_CLASS_PREFIX = 'rating';
  /**
   * Returns a rating css.
   */
  helpers.getRatingClass = function(number) {
    return RATING_CLASS_PREFIX + (number || 0);
  };

  /**
   * Return a rating html tag.
   */
  helpers.getRatingTag = function(number) {
    return '<span class="' + helpers.getRatingClass(number) + '"></span>';
  };
}(this));
