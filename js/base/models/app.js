/**
 * app.js - Application base model.
 *
 * requires: jQuery, Backbone, _.
 */

(function(global, options) {
  'use strict';

  /**
   * namespace.
   */
  var rootNs = global.getRootNamespace();
  var base = rootNs.namespace('base.models');

  var helpers = rootNs.namespace('base.helpers');

  // Backbone.Model for application.
  base.App = Backbone.Model.extend({
    // Get date for view(default attribute: 'date'). Override if necessary.
    getDateForView: function() {
      return this.get('date') || '000000000000';
    },
    getDateFromTimestamp: function() {
      return helpers.getDateFromTimestamp(this.getDateForView());
    }
  });

  return base.App;
}(this));
