var assert = buster.assert;
var refute = buster.refute;

buster.testCase("Mixins Views tests", {
  setUp: function() {
    this.rootNs = window.getRootNamespace();
    this.mixinsViews = this.rootNs.namespace('mixins.mvc.views');
    $(document.body).append('<div id="mixinsViews">' +
    '<a href="#" id="testLink">Click</a>' +
    '<button id="testButton">' +
    '</div>');
  },
  tearDown: function() {
    this.mixinsViews = null;
  },
  'Destructor': {
    setUp: function() {
      this.View = Backbone.View.extend(_.extend({}, this.mixinsViews.Destructor, {
        el: '#testLink',
//        events: {
//          'cilck': 'onTapA'
//        },
        initialize: function() {
          _.bindAll(this);
          this.clickCount = 0;
          this.on('click', this.onTapA);
        },
        onTapA: function(e) {
          this.clickCount++;
        }
      }));
      this.view = new this.View();

      this.view.render();
    },
    tearDown: function() {
      this.view = null;
      this.View = null;
    },
    'should unregister events calling with "unregisterEvents"': function() {
      this.view.trigger('click');
      assert.same(this.view.clickCount, 1);
      this.view.unregisterEvents();
      this.view.trigger('click');
      this.view.trigger('click');
      assert.same(this.view.clickCount, 1);
    },
    'should unregister events calling with "destruct"': function() {
      this.view.trigger('click');
      assert.same(this.view.clickCount, 1);
      this.view.destruct();
      this.view.trigger('click');
      this.view.trigger('click');
      assert.same(this.view.clickCount, 1);
    }
  },
  '//CssState': {
    setUp: function() {
      this.View = Backbone.View.extend(_.extend({}, mixinsViews.CssState, {
        el: '#testButton'
      }));
    },
    tearDown: function() {
      this.View = null;
    },
    'should set css class': function() {
      var view = new View();
    }
  }
});
