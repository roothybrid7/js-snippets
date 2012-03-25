/**
 * audioservice.js - Get audio service model.
 */

(function(global, options) {
  'use strict';

  /**
   * namespace.
   */
  var rootNs = global.getRootNamespace();
  var utils = rootNs.namespace('utils');

  var models = rootNs.namespace('base.models');
  var constants = rootNs.Constants.getInstance();

  /**
   * Returns audio model.
   *
   * @param {string} name Audio service name.
   * @return {{getKlass: function(*)}} A factory function of audio model.
   */
  utils.AudioService = function(name) {
    var service = constants.audioService[name] ||
    constants.DEFAULT_AUDIO_SERVICE;

    return {
      getKlass: function() {
        return models[service];
      }
    };
  };

  return utils.AudioService;
}(this));
