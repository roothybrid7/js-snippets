/**
 * app.js - Application base collection.
 *
 * requires: jQuery, Backbone, _.
 */

(function(global, options) {
  'use strict';

  /**
   * namespace.
   */
  var rootNs = global.getRootNamespace();
  var base = rootNs.namespace('base.collections');

  // Backbone.Collection for application.
  base.App = Backbone.Collection.extend({
    initialize: function() {
    },
//    collection.on('reset change', collection.resetForCollection, collection);
    resetForCollection: function() {
      this.currentItem = null;
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
      }
      if (item) {
        this.currentItem = item;
      }

      this.trigger('updatecurrent', item);
    }
  });

  return base.App;
}(this));
