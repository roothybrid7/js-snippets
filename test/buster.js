var config = exports; // Vanity

config['Browser tests'] = {
  environment: 'browser',
  rootPath: '../',
  libs: [
    'js/libs/modernizr*.js',
    'js/libs/dev/jquery*.js',
    'js/libs/json2.js',
    'js/libs/dev/underscore*.js',
    'js/libs/dev/backbone*.js'
  ],
  sources: [
    'test/strftime.js',
    'js/config.js',
    'js/module.js'
  ],
  tests: [
    'test/strftime-test.js',
    'test/config-test.js',
    'test/module-test.js'
  ]
};

//config['Server tests'] = {
//  extends: 'Browser tests',
//  environment: 'node'
//};
