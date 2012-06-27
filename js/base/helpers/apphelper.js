/**
 * apphelper.js - Application mvc helper utlities.
 *
 * requires: underscore.js.
 */

(function(global) {
  'use strict';

  /**
   * namespace
   */
  var rootNs = global.getRootNamespace();
  var module = rootNs.namespace('mvc.helpers');

  /**
   * dump object.
   *
   * Example:
   *  console.log(module.objDump({a:1}));
   *  > "{
   *      "a": 1
   *    }"
   *
   * @param {*} object A source object.
   * @return {string} A JSON.stringified object.
   */
  module.objDump = function(object) {
    return JSON.stringify(object, null, 2);
  };

  /**
   * Returns string with replacing nl to br.
   *
   * Example:
   *  var str = 'title\nbody';
   *  $('#content').html(module.nl2br(str));
   *  > <div id="content">
   *      title<br/>body
   *    </div>
   *
   * @param {string} string string.
   * @return {string} converted string.
   */
  module.nl2br = function(string) {
    return string && string.replace(/\r\n|\r|\n/g, '<br/>') || '';
  };

  /**
   * Simple format.
   *
   * Example:
   *  var text = 'Title\nBody.',
   *      attrs = {class: 'text'};
   *  $('#content').append(module.simpleFormat(text, attrs);
   *  > <div id="content'>
   *      <p class="text">Title<br/>Body.</p>
   *    </div>
   *
   * @param {string} text A text string of <p> tag.
   * @param {Object} options A <p> tag attributes.
   * @return {string} <p> html string..
   */
  module.simpleFormat = function(text, options) {
    var opts = (typeof options === 'object') ? options : {},
        attrs = module.compactObject(opts, [0]),
        html = module.nl2br(text);
    return $(document.createElement('p')).attr(attrs).html(html).get(0);
  };

  /**
   * Format message.
   *
   * Example:
   *  var text = 'this is the test';
   *  module.formatMessage(text);
   *  > this is the test.
   *  var text2 = 'Who are you?';
   *  module.formatMessage(text2);
   *  > Who are you?
   *  var text3 = 'Great!!';
   *  module.formatMessage(text3);
   *  > Great!!
   *
   * @param {string} message A message string.
   * @return {string} A formatted message string.
   */
  module.formatMessage = function(message) {
    var msg = message;
    msg += (message && !!!message.slice(-1).match(/(\.|!|\?)$/)) ? '.' : '';
    return msg;
  };

  /**
   * Returns a copy of the object with all falsy values removed.
   *
   * @param {Object} object Javascript object.
   * @param {Array} options Leave falsy value(false, 0, '').
   * @return {Object} compacted object.
   */
  module.compactObject = function(object, options) {
    var origObject = _.clone(object),
        opts = options || [];

    _.chain(origObject).clone().each(function(value, key) {

      if (!!!value && !!!_.include(opts, value)) {
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
  module.zeroPadding = function(number, digits) {
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
  module.concatStrings = function(srcStr, addStr) {
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
  module.joinStrings = function(list, condition, defaults) {
    var str = '';
    if (condition) {
      str = list.join('');
    } else {
      str = defaults;
    }
    return str;
  };

  /**
   * Create paragraph in array.
   *
   * @param {Array.<string>} array A string of array.
   * @param {string=} defaults A default paragraph.
   * @return {string} Created paragraph.
   */
  module.createParagraphInArray = function(array, defaults) {
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
  module.getPathname = function(url) {
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
  module.truncateString = function(string, options) {
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
  module.getDateFromTimestamp = function(timestamp) {
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
   * @see requires dateformat.js
   */
  module.strftime = function(formatString, date) {
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
   * @see requires dateformat.js
   */
  module.dateParse = function(formatString, dateString) {
    var fmt = new DateFormat(formatString);
    return fmt.parse(dateString);
  };

  /**
   * Capitalize string.
   *
   * @param {string} string A source string.
   * @return {string} A capitalized string.
   */
  module.capitalize = function(string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
  };

  /**
   * Creates and returns uri basename.
   *
   * Example:
   *
   * <pre>
   * module.basename('/foo/bar.txt') // 'bar.txt'
   * module.basename('/foo/bar.html', 'html') // 'bar'
   * module.basename('http://a.com/foo/bar') // 'bar'
   * module.basename('/') // ''
   * </pre>
   *
   * @param {string} path URL OR filepath.
   * @param {string=} suffix suffix string(html, js).
   * @return {?string} url OR path basename.
   * @see require: _(underscore.js).
   */
  module.basename = function(path, suffix) {
    var base = '';
    if (path === '.' || path === '/') {
      base = path;
    } else {
      var entries = path && path.split('/');
      while (entries.length) {
        if ((base = entries.pop())) {
          break;
        }
      }
    }

    if (typeof suffix === 'string' && suffix.length > 0) {
      base = base.replace('.' + suffix, '');
    }
    return base;
  };

  module.dirname = function(path) {
    return path.replace(/\/[^\/]*$/, '');
  };

  return module;
}(this));
