var config = exports; // Vanity

config['Browser tests'] = {
  environment: 'browser',
  rootPath: '../',
  sources: ['test/strftime.js'],
  tests: ['test/strftime-test.js']
};

config['Server tests'] = {
  extends: 'Browser tests',
  environment: 'node'
};

config['Test with custom testbed'] = {
  tests: ['test/testbed-test.js'],
  resources: [
    {
      path: '/',
      file: '../fixtures/testbed.html',
      headers: {
        'Content-Type': 'test/html'
      }
    }
  ],
};
