/**
 * dateformat.js - Custom patterns of dateformat.js.
 *
 * requires: dateformat.js.
 */

(function(global) {
  'use strict';

  DateFormat.prototype._formatter['a'] = function(date, pattern) {
    return date.getHours() < 12 ? 'am' : 'pm';
  };

  DateFormat.prototype._formatter['A'] = function(date, patterns) {
    return date.getHours() < 12 ? 'AM' : 'PM';
  };

  DateFormat.prototype._formatter['hh'] = function(date, patterns) {
    var hours = date.getHours(), pad = '00';
    hours = hours < 12 ? hours : hours - 12;
    return (pad + hours).slice(-2);
  };

  DateFormat.prototype._formatter['h'] = function(date, patterns) {
    var hours = date.getHours();
    return '' + (hours < 12 ? hours : hours - 12);
  };
}(this));
