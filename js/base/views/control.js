/**
 * control.js - view base.
 *
 * requries: jQuery, Backbone.js, underscore.js, mixins.mvc.views.
 */

/**
 * Immediate function for initializing views.
 *
 * @param {window} global window object.
 */
(function(global) {
  'use strict';

  /**
   * namespace
   */
  var rootNs = global.getRootNamespace();
  var module = rootNs.namespace('mvc.base.views');

  var viewMixins = rootNs.namespace('mixins.mvc.views');

  /**
   * Link control.
   */
  module.Link = module.App.extend();

  /**
   * Button trigger: enabled, disabled.
   */
  module.Button = module.App.extend(_.extend({}, viewMixins.ButtonState));

  /**
   * Home Logo
   */
  module.HomeLogo = module.Link.extend({
    events: {
      'click': 'backToHome'
    },
    initialize: function() {
      $(this.el).css({cursor: 'pointer'});
    },
    backToHome: function(e) {
      e && e.preventDefault();
      location.href = '/';
      return false;
    }
  });

  return module;
}(this));
