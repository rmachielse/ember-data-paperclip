/* eslint-env node */
'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    storeConfigInMeta: false,
    fingerprint: {
      enabled: false
    },
    sassOptions: {
      extension: 'sass'
    },
    'ember-cli-bootstrap-sassy': {
      quiet: true
    }
  });

  app.import('node_modules/highlightjs/highlight.pack.js');
  app.import('node_modules/highlightjs/styles/github.css');

  return app.toTree();
};
