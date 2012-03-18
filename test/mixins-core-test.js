var assert = buster.assert;
var refute = buster.refute;

buster.testCase("Mixins Core tests", {
  setUp: function() {
    this.rootNs = window.getRootNamespace();
    this.mixinsCore = this.rootNs.namespace('mixins');
  },
  tearDown: function() {
    this.mixinsCore = null;
  },
  'should bind method to object': function() {
    var method = Array.prototype.join;
    var obj = [1,2,3];
    var args = [''];
    var bindMethod = this.mixinsCore.bind(obj, method);

    var actual = '123';
    assert.same(bindMethod(args), actual);
  },
  'Register': {
    'should register function for object with typeof function': function() {
      var method = String.prototype.toUpperCase;
      var klass = function() {};
      var mixinsObj = this.mixinsCore.register(method, klass);
      assert.isFunction(mixinsObj.toUpperCase);
    },
    'shold register function of getInstance': function() {
      var method = 'sharedInstance';
      var klass = function() {};
      this.mixinsCore.register(method, klass);
      assert.isFunction(klass.getInstance);
    }
  },
  'sharedInstance': {
    setUp: function() {
      this.klass = function() {};
    },
    tearDown: function() {
      this.klass = null;
    },
    'should create sharedInstance': function() {
      this.mixinsCore.sharedInstance(this.klass);
      var ins = this.klass.getInstance();
      assert(ins instanceof this.klass);
    },
    'should create sharedInstance by register function': function() {
      var method = 'sharedInstance';
      this.mixinsCore.register(method, this.klass);
      var ins = this.klass.getInstance();
      assert(ins instanceof this.klass);
    },
    'should be same object': function() {
      var method = 'sharedInstance';
      this.mixinsCore.register(method, this.klass);
      var ins1 = this.klass.getInstance();
      var ins2 = this.klass.getInstance();
      assert.same(ins1, ins2);
    },
    'should not be same object': function() {
      var method = 'sharedInstance';
      this.mixinsCore.register(method, this.klass);
      var ins1 = this.klass.getInstance();
      var ins2 = new this.klass();
      refute.same(ins1, ins2);
    }
  },
  'Singleton should be same': function() {
    var method = 'sharedInstance';
    var instance = null;
    var klass = function() {
      if (instance) {
        return instance;
      }
      instance = this;

      return this;
    };
    this.mixinsCore.register(method, klass);
    var ins1 = klass.getInstance();
    var ins2 = klass.getInstance();
    var ins3 = new klass();
    assert.same(ins1, ins2);
    assert.same(ins1, ins3);
  }
});
