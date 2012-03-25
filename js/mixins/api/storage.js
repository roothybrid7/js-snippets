/**
 * storage.js - Mixins of storage.
 *
 * requires: jQuery.cookie.
 */

(function(global) {
  'use strict';

  /**
   * namespace
   */
  var rootNs = global.getRootNamespace();
  var mixins = rootNs.namespace('mixins.api');

  /**
   * Storage api.
   */
  mixins.Storage = {
    /**
     * set value to cookie.
     *
     * @param {string} key A stored key.
     * @param {?} value A stored value.
     *
     * requires: jQuery.cookie.
     */
    setCookie: function(key, value) {
      if (typeof value === 'undefined' || value === null) {
        $.cookie(key, null);
      } else {
        $.cookie(key, JSON.stringify(value));
      }
    },
    /**
     * get value from cookie.
     *
     * @param {string} key A stored key.
     *
     * requires: jQuery.cookie.
     */
    getCookie: function(key) {
      var value = $.cookie(key);
      return (value ? JSON.parse(value) : null);
    },
    /**
     * set value to localStorage.
     *
     * @param {string} key A stored key part.
     * @param {?} value A stored value.
     */
    setStorage: function(key, value) {
      var storedKey = location.pathname + key;
      if (typeof value === 'undefined' || value === null) {
        localStorage.setItem(storedKey, null);
      } else {
        localStorage.setItem(storedKey, JSON.stringify(value));
      }
    },
    /**
     * get value from localStorage.
     *
     * @param {string} key A stored key part.
     */
    getStorage: function(key) {
      var storedKey = location.pathname + key;
      var data = localStorage.getItem(storedKey);
      return (data ? JSON.parse(data) : null);
    }
  };

  return mixins.Storage;
}(this));
