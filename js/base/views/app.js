/**
 * app.js - Application backbone base view.
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

  var viewMixins = rootNs.namespace('mixins.mvc.views');
  var utilMixins = rootNs.namespace('mixins.mvc.utils');
  var helpers = rootNs.namespace('base.helpers');

  // Backbone.View with common helper methods.
  base.App = Backbone.View.extend(
  _.extend({}, utilMixins.Core, viewMixins.Destructor, helpers));

  return base.App;
}(this));
