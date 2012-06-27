/**
 * views.js - Javascript mvc framework extends functions.
 *
 * @see requires jQuery, Backbone, _(underscore.js)
 */

/**
 * Immediate function for initializing mvc mixins module.
 *
 * @param {window} global window object.
 */
(function(global) {
  'use strict';

  /**
   * namespace
   */
  var rootNs = global.getRootNamespace();
  var module = rootNs.namespace('mixins.mvc.views');

  /**
   * A view destruct method.
   */
  module.Destructor = {
    // Should be override.
    destruct: function() {
      this.unregisterEvents();
    },
    // Should be override.
    unregisterEvents: function() {
      this.off();
      this.undelegateEvents();
      return this;
    }
  };

  /**
   * A view control state by css class name.
   */
  module.CssState = {
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
    setControl: function(flag, options) {
      options = options || {};
      this.__setInitState();
      var state = this.controlStateCss;
      var ev = null;
      if (flag) {
        $(this.el).removeClass(state.disabled);
        $(this.el).addClass(state.enabled);
        ev = 'enabled';
      } else {
        $(this.el).removeClass(state.enabled);
        $(this.el).addClass(state.disabled);
        ev = 'disabled';
      }
      options.silent || this.trigger(ev);
    }
  };

  /**
   * Button control extension.
   */
  module.ButtonState = _.extend({}, module.CssState, {
    setStatusClass: function(options) {
      options = options || {};
      options.enabled = options.enabled || 'tap';
      options.disabled = options.disabled || 'btn-notap';
      this.__setStatusClassBase(options);
    }
  });

  /**
   * Switch/Checkbox control extension.
   */
  module.Switch = _.extend({}, module.CssState, {
    toggle: function(e) {
      this.__setInitState();
      e && e.preventDefault();
      if ($(this.el).is('.' + this.controlStateCss.enabled)) {
        this.setControl(false, {silent: true});
        this.trigger('off', e);
      } else {
        this.setControl(true, {silent: true});
        this.trigger('on', e);
      }
      return false;
    }
  });

  /**
   * Checkbox control extension.
   */
  module.CheckBox = _.extend({}, module.Switch, {
    setStatusClass: function(options) {
      options = options || {};
      options.enabled = options.enabled || 'check-on';
      options.disabled = options.disabled || 'check';
      this.__setStatusClassBase(options);
    }
  });

  return module;
}(this));
