/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    storeConfigInMeta: false,
    fingerprint: {
      enabled: false
    },
    sassOptions: {
      extension: 'sass'
    },
    jscsOptions: {
      testGenerator: testGenerator
    },
    'ember-cli-bootstrap-sassy': {
      quiet: true
    }
  });

  function testGenerator(relativePath, errors) {
    if (errors) {
      errors = '\\n' + this.escapeErrorString(errors);
    } else {
      errors = '';
    }

    return [
      'describe("JSCS - ' + relativePath + '", function () {',
        'it("should pass jscs", function () {',
          'expect(' + !errors + ', "' + relativePath + ' should pass JSCS' + errors + '").to.be.ok;',
        '});',
      '});'
    ].join('\n');
  }

  return app.toTree();
};
