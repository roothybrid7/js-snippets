/**
 * app.js - Application base collection.
 *
 * requires: jQuery, Backbone, _.
 */

(function(global) {
  'use strict';

  /**
   * namespace.
   */
  var rootNs = global.getRootNamespace();
  var module = rootNs.namespace('mvc.base.collections');

  // Backbone.Collection for application.
  module.App = Backbone.Collection.extend({
    initialize: function() {
    },
    resetWithCurrentItem: function(items) {
      this.currentItem = null;
      this.reset(items);
    },
    onReset: function() {
    },
    // Helper methods of collection for view.
    getCurrentItem: function() {
      return this.currentItem || this.first();
    },
    updateCurrentItem: function(options) {
      var item = null;
      if ('cid' in options) {
        item = this.getByCid(options.cid);
      } else if ('index' in options) {
        item = this.at(options.index);
      } else if ('id' in options) {
        item = this.get(options.id);
      }
      if (item) {
        this.currentItem = item;
      }

      this.trigger('updatecurrent', item);
    }
  });

  return module.App;
}(this));
