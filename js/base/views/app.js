/**
 * app.js - Application backbone base view.
 *
 * requires: jQuery, Backbone, _(underscore.js), viewMixins, helpers.
 */

(function(global) {
  'use strict';

  /**
   * namespace.
   */
  var rootNs = global.getRootNamespace();
  var module = rootNs.namespace('mvc.base.views');

  var viewMixins = rootNs.namespace('mixins.mvc.views');
  var helpers = rootNs.namespace('mvc.helpers');

  // Backbone.View with common helper methods.
  module.App = Backbone.View.extend(
  _.extend({}, viewMixins.Destructor, helpers));

  return module.App;
}(this));
