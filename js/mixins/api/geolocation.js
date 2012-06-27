/**
 * geolocation.js - HTML5 geolocation api.
 *
 * requires: jQuery.
 */

(function(global) {
  'use strict';

  /**
   * namespace
   */
  var rootNs = global.getRootNamespace();
  var module = rootNs.namespace('mixins.api');

  /**
   * Geolocation api with jQuery deferred.
   */
  module.GeoLocation = {
    getCurrentPositionDeferred: function(options) {
      var deferred = $.Deferred();
      navigator.geolocation.getCurrentPosition(
        deferred.resolve, deferred.reject, options);
      return deferred.promise();
    },
    watchPositionDeferred: function(options) {
      var deferred = $.Deferred();
      this.geoWatchId = navigator.geolocation.watchPosition(
          deferred.resolve, deferred.reject, options);
      return deferred.promise();
    },
    clearWatch: function() {
      var id = this.watchId;
      id && navigator.geolocation.clearWatch(id);
    }
  };

  return module.GeoLocation;
}(this));
