/**
 * module.js - Defines namespace, module.
 */

(function(global, options) {
  'use strict';

  /**
   * namespace
   */
  var config = global.appConfig || {rootNs: 'App'};
  global[config.rootNs] = global[config.rootNs] || {};

  var app = global[config.rootNs];

  global.getRootNamespace = function() {
    return app;
  };
  app.toString = function() {
    return config.rootNs;
  };

  /**
   * Creates and returns application namespace.
   *
   * Examples:
   *
   * <code>
   *    var foo = App.namespace('App.foo'); // => App.foo
   *    App.namespace('foo.bar.buz');   // => App.foo.bar.buz
   * </code>
   *
   * @param {string} ns namespace string('App.Home', 'App.About').
   * @return {Object} created namespace object.
   */
  app.namespace = function(ns) {
    var parts = ns.split('.'), parent = app, i, l;

    if (parts[0] === app.toString()) {
      parts.shift();
    }

    for (i = 0, l = parts.length; i < l; i++) {
      if (parent[parts[i]] === undefined) {
        parent[parts[i]] = {};
      }
      parent = parent[parts[i]];
    }
    return parent;
  };

  return app;
}(this));
