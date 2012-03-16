/**
 * core.js - Javascript extends core function.
 */

/**
 * Immediate function for initializing core mixins.
 *
 * @param {window} global window object.
 * @param {Object} options option parameters.
 */
(function(global, options) {
  'use strict';

  /**
   * namespace
   */
  var rootNs = global.getRootNamespace();
  var mixins = rootNs.namespace('mixins');

  /**
   * Bind method to object or constructor.
   *
   * @param {(Object|Function)} object A object or constructor that binding
   *          method.
   * @param {Function} method A binding method.
   * @return {Function} A function to accessing binding method with object.
   */
  mixins.bind = function(object, method) {
    return function() {
      return method.apply(object, [].slice.call(arguments));
    };
  };

  /**
   * Register functions for object(sharedInstance, etc.).
   *
   * @param {Function} method A method that provides function.
   * @param {Object} object A target object.
   * @return {?} register result.
   */
  mixins.register = function(method, object) {
    if (typeof method === 'string') {
      method = mixins[method];
    }
    if (method instanceof Function) {
      return method.apply(object);
    }
    return null;
  };

  /**
   * @type {Object} Instance store object for shared instance.
   */
  var instances = {};

  /**
   * Store instance.
   *
   * @private
   * @param {Object} A shared instance.
   * @return {string} A stored list key.
   */
  mixins.__storedInstance = function(object) {
    // Add class method to get shared instance.
    var pre = Math.floor(Math.random() * 10000).toString();
    var suf = Math.floor(Math.random() * 10000).toString();
    var key = pre + Date.now().toString() + suf;
    instances[key] = object;
    return key;
  };

  /**
   * Creates a class method that provide shared instance.
   *
   * Add class methods for accesing shared instance:
   *
   * <pre>
   * klass.getInstance();
   * </pre>
   *
   * Code example[namespace('xxx.mixins.register')]:
   *
   * <pre>
   * function Klass() {
   * }
   * xxx.mixins.register('sharedInstance', Klass);
   * var a = Klass.getInstance();
   * var b = Klass.getInstance(); // a === b
   * var c = new Klass(); // a !== c
   * </pre>
   *
   * With singleton example[namespace('xxx.mixins.register')]:
   *
   * <pre>
   * (function() {
   *   var instance = null;
   *   function Klass() {
   *     if (instance) {
   *       return instance;
   *     }
   *     instance = this;
   *     this.name = 'Klass';
   *     this.getName = function() {
   *       return this.name;
   *     };
   *   }
   *   xxx.mixins.register('sharedInstance', Klass);
   * })();
   * var a = Klass.getInstance();
   * var b = Klass.getInstance(); // a === b
   * var c = new Klass(); // a === c
   * </pre>
   *
   * @param {Function} object A constructor to share.
   * @return {?Object} A shared instance. When the first call, always returns
   *         null.
   */
   mixins.sharedInstance = function(klass) {
     klass = klass || this;
     if (klass && klass instanceof Function) {
       var instance = klass.getInstance && klass.getInstance();
       // Register already.
       if (instance) {
         return instance;
       }

       // Add class method to get shared instance.
       var key = mixins.__storedInstance(new klass());
       klass.getInstance = mixins.bind(klass, function() {
         return instances[key];
       });
     } else {
       alert('You can only register a constructor!!\n' + JSON.stringify(klass));
     }
     return null;
   };

   /**
    * Register module Debug method.
    *
    * @private
    */
   mixins.register.__debug = function() {
     return {
       instances: instances
     };
   };

   return mixins;
}(this));
