/**
 * constants.js - Constant variables.
 */

(function(global) {
  'use strict';

  /**
   * namespace.
   */
  var rootNs = global.getRootNamespace();

  // A singleton pointer.
  var instance = null;

  /**
   * @constructor
   */
  rootNs.Constants = function() {
    if (instance) {
      return instance;
    }

    /**
     * @const
     * @type {string}
     */
    this.DEFAULT_AUDIO_SERVICE = '';

    this.audioService = {};

    instance = this;

    return instance;
  };
  rootNs.mixins.register('sharedInstance', rootNs.Constants);

  return rootNs.Constants;
}(this));
