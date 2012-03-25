/**
 * apphelper.js - Application mvc helper utlities.
 *
 * requires: jQuery, Backbone, _(underscore.js)
 */

/**
 * Immediate function for Initializing mvc helper module.
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
  var helpers = rootNs.namespace('base.helpers');

  /**
   * Returns string with replacing nl to br.
   *
   * @param {string} string string.
   * @return {string} converted string.
   */
  helpers.nl2br = function(string) {
    return string && string.replace(/\r\n|\r|\n/, '</br>') || '';
  };

  /**
   * Returns a copy of the object with all falsy values removed.
   *
   * @param {Object} object Javascript object.
   * @param {Array} options Leave falsy value(false, 0, '').
   * @return {Object} compacted object.
   */
  helpers.compactObject = function(object, options) {
    var origObject = _.clone(object);
    options = options || [];

    _.chain(origObject).clone().each(function(value, key) {

      if (!!!value && !!!_.include(options, value)) {
        delete origObject[key];
      }
    });

    return origObject;
  };

  /**
   * Creates and returns zero padding number.
   *
   * @param {(number|string)} number A target number.
   * @param {number} digits Number of digits.
   * @return {string} Converted zero padding number.
   */
  helpers.zeroPadding = function(number, digits) {
    var padding = '', i = 0, l = 0;
    for (i = 0, l = digits - 1; i < l; i++) {
      padding += '0';
    }
    return (padding + number).slice(-1 * digits);
  };

  /**
   * Concat strings.
   *
   * @param {?string} srcStr A stc string.
   * @param {string} addStr A concat add string.
   * @return {?Object} Concated object.
   */
  helpers.concatStrings = function(srcStr, addStr) {
    if (!!!srcStr) {
      return '';
    }
    return srcStr + addStr;
  };

  /**
   * Join strings with conditional.
   *
   * @param {Array.<string>} list join strings.
   * @param {boolean} condition Returns the joined string in true. else
   *          defaults.
   * @param {string} defaults Returns the string default value.
   * @return {string} the joined string or defaults string.
   */
  helpers.joinStrings = function(list, condition, defaults) {
    var str = '';
    if (condition) {
      str = list.join('');
    } else {
      str = defaults;
    }
    return str;
  };

  /**
   * Create paragraph in model for keys.
   *
   * @param {Object} model A backbone model.
   * @param {Array.<string>} keys A backbone model keys.
   * @param {string=} defaults A default paragraph.
   * @return {string} Created paragraph.
   */
  helpers.createParagraphInModelForKeys = function(model, keys, defaults) {
    var paragraph = '', strArr = [];
    _.each(keys, function(key) {
      strArr.push(model.get(key));
    });
    strArr = _.compact(strArr);
    if (strArr.length === 0) {
      paragraph = defaults + '.';
    } else {
      paragraph = strArr.join('. ') + '.';
    }
    return paragraph;
  };

  /**
   * Create paragraph in array.
   *
   * @param {Array.<string>} model A backbone model.
   * @param {string=} defaults A default paragraph.
   * @return {string} Created paragraph.
   */
  helpers.createParagraphInArray = function(array, defaults) {
    var paragraph = '', strArr = [];
    _.each(array, function(item) {
      strArr.push(item);
    });
    strArr = _.compact(strArr);
    if (strArr.length === 0) {
      paragraph = defaults + '.';
    } else {
      paragraph = strArr.join('. ') + '.';
    }
    return paragraph;
  };

  /**
   * Returns pathname from url.
   *
   * @param {string} url url string.
   * @return {?string} pathname.
   */
  helpers.getPathname = function(url) {
    var pathname = null;
    if (url) {
      var a = document.createElement('a');
      a.href = url;
      pathname = a.pathname;
    }
    return pathname;
  };

  /**
   * Truncates string if string is longer then length.
   *
   * @param {string} string A string.
   * @param {Object=} options Option parameters.
   * @return {string} A truncated string.
   */
  helpers.truncateString = function(string, options) {
    var result = '';
    options = options || {};
    if (options.length > 3 && string.length > options.length) {
      result = string.slice(0, options.length - 3) + '...';
    } else {
      result = string;
    }

    return result;
  };

  /**
   * Create and returns date object from timestamp.
   *
   * @param {(number|string)} timestamp Unix timestamp.
   * @return {Date} A creted date object.
   */
  helpers.getDateFromTimestamp = function(timestamp) {
    var date = new Date();
    timestamp += '';
    if (timestamp.length === 10) {
      timestamp += '000';
    }
    timestamp = parseInt(timestamp, 10);
    date.setTime(timestamp);

    return date;
  };

  /**
   * Create and returns formatted date string.
   *
   * @param {string} formatString A date format string.
   * @param {Date} date A date object.
   * @return {string} A formatted date string.
   * requires: dateformat.js
   */
  helpers.strftime = function(formatString, date) {
    var fmt = new DateFormat(formatString);
    var tmp = fmt.format(date);
    return fmt.format(date);
  };

  /**
   * Parses date string and returns date.
   *
   * @param {string} formatString A date format string.
   * @param {string} dateString A date string.
   * @return {Date} A parsed date object.
   * requires: dateformat.js
   */
  helpers.dateParse = function(formatString, dateString) {
    var fmt = new DateFormat(formatString);
    return fmt.parse(dateString);
  };

  return helpers;
}(this));
