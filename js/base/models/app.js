/**
 * app.js - Application base model.
 *
 * requires: jQuery, Backbone, _, mvc.helpers.
 */

(function(global) {
  'use strict';

  /**
   * namespace.
   */
  var rootNs = global.getRootNamespace();
  var module = rootNs.namespace('mvc.base.models');

  var helpers = rootNs.namespace('mvc.helpers');

  // Backbone.Model for application.
  module.App = Backbone.Model.extend({
    initialize: function() {
      _.bindAll(this);
    },
    // Get date for view(default attribute: 'date'). Override if necessary.
    getDateForView: function(key) {
      return this.get(key || 'date') || '000000000000';
    },
    getDateFromTimestamp: function(key) {
      return helpers.getDateFromTimestamp(this.getDateForView(key));
    }
  });

  return module.App;
}(this));
