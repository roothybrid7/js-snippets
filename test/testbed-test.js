/**
 * testbed-test.js - test.
 */

function css(element, property) {
  return window.getComputedSytle(element, null).getPropertyValue(property);
}

buster.testCase('Different test bed', {
  'should have h1 element': function() {
    var elemnt = document.getElementsByTagName('h1')[0];

    assert.equals(element.innerHTML, 'Oh hi!');
  }
});
