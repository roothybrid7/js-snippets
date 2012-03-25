/**
 * logger.js - mvc framework logger.
 *
 * requires: log4javascript.
 */

(function(global, options) {
  'use strict';

  /**
   * namespace.
   */
  var rootNs = global.getRootNamespace();
  var utils = rootNs.namespace('utils');

  var logger = (log4javascript) ? log4javascript.getLogger() : console;

  /**
   * Logger for application.
   *
   * @param {string} name Audio service name.
   * @return {{getKlass: function(*)}} A factory function of audio model.
   */
  utils.Logger = function() {
    var logger = null;
    if (log4javascript) {
      logger = log4javascript.getLogger();

      var consoleAppender = new log4javascript.BrowserConsoleAppender();
      var layout = new log4javascript.PatternLayout(
        '%d{yyyy-MM-dd HH:mm:ss,SSS} %-5p - %m%n');
      consoleAppender.setLayout(layout);

      logger.addAppender(consoleAppender);
    } else {
      logger = console;
    }

    return {
      getLogger: function() {
        return logger;
      }
    };
  };

  return utils.Logger;
}(this));
