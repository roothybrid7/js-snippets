/**
 * geolocation.js - HTML5 geo location api.
 *
 * requires: jQuery.
 */


/**
 * Immediate function for initializing mvc mixins module.
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
  var mixins = rootNs.namespace('mixins.api');

  /**
   * Geo location api with jQuery deferred.
   */
  mixins.GeoLocation = {
    getCurrentPositionDeferred: function(options) {
      var deferred = $.Deferred();
      navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, options);
      return deferred.promise();
    }
  };

  return mixins.GeoLocation;
}(this));
