/**
 * audio.js - Application base audio model.
 *
 * requires: Backbone, _.
 */

(function(global) {
  'use strict';

  /**
   * namespace.
   */
  var rootNs = global.getRootNamespace();
  var module = rootNs.namespace('mvc.base.models');

  module.Audio = module.App.extend({
    // Should be override.
    getAudioUrl: function(message) {
      return message;
    }
  });

  return module.Audio;
}(this));
