var assert = buster.assert;

buster.testCase("Config tests", {
  'appConfig': {
    'should be object': function() {
      assert.isObject(appConfig);
    },
    'rootNs should be a string of root namespace': function() {
      assert.same(appConfig.rootNs, 'App');
    }
  }
});
