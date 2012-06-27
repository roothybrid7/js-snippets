/**
 * audio.js - HTML5 Audio api. Audio constructor.
 *    This is used shared controls and automatic playback.
 *
 * requires: jQuery, Backbone, _(underscore.js).
 */

(function(global) {
  'use strict';

  /**
   * namespace.
   */
  var rootNs = global.getRootNamespace();
  var module = rootNs.namespace('mvc.base.views');

  var constants = rootNs.Constants.getInstance();

  // HTML5 Audio API view model.
  module.Audio = module.App.extend({
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
      module.App.prototype.unregisterEvents.apply(this, arguments);
      return this;
    },
    initialize: function() {
      _.bindAll(this);
      this.audio = new Audio();
    },
    bindOriginalEvents: function(events, callback) {
      this.audio && $(this.audio).on(events, callback);
      return this;
    },
    unbindOriginalEvents: function(events) {
      this.audio && $(this.audio).off(events);
      return this;
    },
    create: function(urlString) {
      // Remove old audio events.
      $(this.audio).off();
      this.setAudioReady(false);

      // Creates new audio.
      this.audio = new Audio(urlString);
      this.timeoutId = setTimeout(this.timeoutAudio, constants.AUDIO_TIMEOUT);

      $(this.audio)
        .on('canplaythrough', this.canPlayReady)
        .on('ended', this.end)
        .on('abort error', this.error)
        .on('play', this.onPlayStart);
    },
    onPlayStart: function(e) {
      this.trigger('playstart', e);
    },
    timeoutAudio: function(e) {
      this.error(e);
    },
    canPlayReady: function(e) {
      console && console.log('Audio#canPlayReady');
      this.setAudioReady(true);
      clearTimeout(this.timeoutId);
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
      this.audio && $(this.audio).off();
      this.setAudioReady(false);
    },
    end: function(e) {
      this.stop();
      // notify parent view.
      this.trigger('end', e);
    },
    error: function(e) {
      this.stop();
      clearTimeout(this.timeoutId);
      this.trigger('error', e);
    }
  });

  return module.Audio;
}(this));
