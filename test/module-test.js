var assert = buster.assert;

buster.testCase("Module tests", {
    'Root namespace': {
      'should return a application namespace': function() {
        var actual = window.App;
        var expected = window.getRootNamespace();
        assert.isObject(expected);
        assert.same(expected, actual);
      },
      'should return string of root namespace': function() {
        var actual = 'App';
        var expected = window.getRootNamespace().toString();
        assert.same(expected, actual);
      }
    },

    'Application namespace': {
      setUp: function() {
        this.rootNs = window.getRootNamespace();
      },
      tearDown: function() {
        delete this.rootNs.a;
      },
      'should create namespace': function() {
        var expected = this.rootNs.namespace('a');
        var actual = this.rootNs.a;
        assert.isObject(expected);
        assert.same(expected, actual);
      },
      'should create recursive namespace': function() {
        var expected = this.rootNs.namespace('a.b.c');
        var actual = this.rootNs.a.b.c;
        assert.isObject(expected);
        assert.same(expected, actual);
      },
      'should same include root namespace as exclude root namespace': function() {
        var rootNsStr = this.rootNs.toString();
        var expected = this.rootNs.namespace(rootNsStr + '.a.b.c');
        var actual = this.rootNs.namespace('a.b.c');
        assert.same(expected, actual);
      }
    }
});
