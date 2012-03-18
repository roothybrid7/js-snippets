var assert = buster.assert;
var refute = buster.refute;

buster.testCase("Mixins utils tests", {
  setUp: function() {
    this.rootNs = window.getRootNamespace();
    this.mixinsUtils = this.rootNs.namespace('mixins.mvc.utils');
  },
  tearDown: function() {
    this.mixinsUtils = null;
  },
  'mixins.Core': {
    setUp: function() {
      this.Klass = function() {
        this.a = function() {
          this.executedA = 'a';
        };
        this.b = function() {
          this.executedB = 'b';
        };
        this.c = function() {
          this.executedC = 'c';
        };
      };
    },
    tearDown: function() {
      this.Klass = null;
    },
    'should extend methods': function() {
      var obj = new this.Klass();
      _.extend(obj, this.mixinsUtils.Core);
      var expected = obj.executeCommands;
      assert.isFunction(expected);
    },
    'should execute functions': function() {
      var obj = new this.Klass();
      _.extend(obj, this.mixinsUtils.Core);
      obj.executeCommands(['a', 'b']);

      assert.same(obj.executedA, 'a');
      assert.same(obj.executedB, 'b');
      refute.defined(obj.executedC);
    }
  }
});
