/**
 * control.js - view base.
 */

/**
 * Immediate function for initializing views.
 *
 * @param {window} global window object.
 * @param {Object} options Option parameters.
 */
(function(global, options) {
  'use strict';

  /**
   * namespace
   */
  var rootNs = global.getRootNamespace();
  var base = rootNs.namespace('base.views');

  var viewMixins = rootNs.namespace('mixins.mvc.views');

  /**
   * Link control.
   */
  base.Link = base.App.extend();

  /**
   * Button trigger: enabled, disabled.
   */
  base.Button = base.App.extend(_.extend({}, viewMixins.ButtonState));

  /**
   * Home Logo
   */
  base.HomeLogo = base.Link.extend({
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
}(this));
