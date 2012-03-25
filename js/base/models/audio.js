/**
 * audio.js - Application base audio model.
 *
 * requires: Backbone, _.
 */

(function(global, options) {
  'use strict';

  /**
   * namespace.
   */
  var rootNs = global.getRootNamespace();
  var base = rootNs.namespace('base.models');

  base.Audio = base.App.extend({
    // Should be override.
    getAudioUrl: function(message) {
      return message;
    }
  });

  return base.Audio;
}(this));
