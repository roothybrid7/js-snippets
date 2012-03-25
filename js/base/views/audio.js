/**
 * audio.js - HTML5 Audio api. Audio constructor.
 *    This is used shared controls and automatic playback.
 *
 * requires: jQuery, Backbone, _(underscore.js).
 */

(function(global, options) {
  'use strict';

  /**
   * namespace.
   */
  var rootNs = global.getRootNamespace();
  var base = rootNs.namespace('base.views');

  // HTML5 Audio API view model.
  base.Audio = base.App.extend({
    audioReady: false,
    canAudioReady: function() {
      return this.audioReady;
    },
    setAudioReady: function(flag) {
      this.audioReady = flag;
    },
    playAudioBuffer: [],
    unregisterEvents: function() {
      $(this.audio).off();
      this.off();
      this.undelegateEvents();
    },
    // Should be override.
    initializerList: [],
    initBase: function() {
      _.bindAll(this);
      this.audio = new Audio();
    },
    initialize: function() {
      this.initBase();
      this.executeCommands(this.initializerList);
    },
    create: function(urlString) {
      // Remove old audio events.
      $(this.audio).off();
      this.setAudioReady(false);

      // Creates new audio.
      this.audio = new Audio(urlString);
      $(this.audio)
        .on('canplaythrough', this.canPlayReady)
        .on('ended', this.end)
        .on('abort error', this.error);
    },
    canPlayReady: function(e) {
      console && console.log('Audio#canPlayReady');
      this.setAudioReady(true);
      var fn = this.playAudioBuffer.shift();
      fn && fn();
    },
    play: function(urlString) {
      if (this.canAudioReady()) {
        console && console.log('Audio ready!! now playing ...');
        this.audio.pause();
        this.audio.play();
      } else {
        console && console.log('Lazy playing ...');
        this.playAudioBuffer = [];
        this.playAudioBuffer.push(this.play);

        if (urlString) {
          this.create(urlString);
        }
      }
    },
    pause: function() {
      this.audio && this.audio.pause();
      this.playAudioBuffer = [];
    },
    stop: function() {
      this.pause();
      this.setAudioReady(false);
    },
    end: function(e) {
      this.stop();
      // notify parent view.
      this.trigger('end', e);
    },
    error: function(e) {
      this.stop();
      this.trigger('error', e);
    }
  });
}(this));
