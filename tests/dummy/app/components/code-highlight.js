/* global hljs */

import Ember from 'ember';

const { Component, on } = Ember;

export default Component.extend({
  tagName: 'pre',
  highlight: on('didInsertElement', function() {
    hljs.highlightBlock(this.$('code').get(0));
  })
});
