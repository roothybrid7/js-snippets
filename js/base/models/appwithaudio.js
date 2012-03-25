/**
 * appwithaudio.js
 *
 * requires: jQuery, Backbone, _.
 */

(function(global) {
  'use strict';

  /**
   * namespace.
   */
  var rootNs = global.getRootNamespace();
  var base = rootNs.namespace('base.models');

  var utils = rootNs.namespace('utils');
  var utilMixins = rootNs.namespace('mixins.mvc.utils');

  base.AppWithAudio = base.App.extend(_.extend({}, utilMixins.Core, {
    initBase: function() {
      var AudioModel = utils.AudioService().getKlass();
      this.audioModel = new AudioModel();
    },
    // Should be override.
    initializerList: [],
    initialize: function() {
      this.initBase();
      this.executeCommands(this.initializerList);
    },
    // Should be override.
    getAudioMessage: function() {
      return 'no message';
    },
    getAudioUrl: function() {
      if (!!!this.audioUrl) {
        this.audioUrl = this.audioModel.getAudioUrl(this.getAudioMessage());
      }
      return this.audioUrl;
    }
  }));

  return base.AppWithAudio;
}(this));
