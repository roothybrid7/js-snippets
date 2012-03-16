/**
 * views.js - Javascript mvc framework extends functions.
 *
 * requires: jQuery, Backbone, _(underscore.js).
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
  var mixins = rootNs.namespace('mixins.mvc.views');

  /**
   * A view destruct method.
   */
  mixins.Destructor = {
    // Should be override.
    destruct: function() {
      this.unregisterEvents();
    },
    // Should be override.
    unregisterEvents: function() {
      this.off();
      this.undelegateEvents();
    }
  };

  /**
   * A view control state by css class name.
   */
  mixins.CssState = {
    __isReady: function() {
      return this.setReady;
    },
    __setInitState: function() {
      if (!!!this.__isReady()) {
        this.setStatusClass();
      }
    },
    __createStateList: function() {
      this.controlStateCss = this.controlStateCss || {};
    },
    __setStatusClassBase: function(options) {
      this.__createStateList();
      var state = this.controlStateCss;
      state.enabled = options && options.enabled || 'on';
      state.disabled = options && options.disabled || 'off';
      this.setReady = true;
    },
    setStatusClass: function(options) {
      this.__setStatusClassBase(options);
    },
    isControl: function() {
      this.__setInitState();
      return $(this.el).is('.' + this.controlStateCss.enabled);
    },
    setControl: function(flag) {
      this.__setInitState();
      var state = this.controlStateCss;
      if (flag) {
        $(this.el).removeClass(state.disabled);
        $(this.el).addClass(state.enabled);
        this.trigger('enabled');
      } else {
        $(this.el).removeClass(state.enabled);
        $(this.el).addClass(state.disabled);
        this.trigger('disabled');
      }
    }
  };

  /**
   * Button control extension.
   */
  mixins.ButtonState = _.extend({}, mixins.CssState, {
    setStatusClass: function(options) {
      options = options || {};
      options.enabled = options.enabled || 'tap';
      options.disabled = options.disabled || 'notap';
      this.__setStatusClassBase(options);
    }
  });

  /**
   * Switch/Checkbox control extension.
   */
  mixins.Switch = _.extend({}, mixins.CssState, {
    toggle: function(e) {
      this.__setInitState();
      e && e.preventDefault();
      if ($(this.el).is('.' + this.controlStateCss.enabled)) {
        this.setControl(false);
        this.trigger('off', e);
      } else {
        this.setControl(true);
        this.trigger('on', e);
      }
      return false;
    }
  });

  /**
   * Checkbox control extension.
   */
  mixins.CheckBox = _.extend({}, mixins.Switch, {
    setStatusClass: function(options) {
      options = options || {};
      options.enabled = options.enabled || 'check-on';
      options.disabled = options.disabled || 'check-off';
      this.__setStatusClassBase(options);
    }
  });

  return mixins;
}(this));
