import Ember from 'ember';
import layout from '../templates/components/upload-form';

const { Component } = Ember;

export default Component.extend({
  layout,

  tagName: 'form',
  classNames: [
    'form-inline'
  ],

  actions: {
    clear() {
      this.element.reset();
      this.get('model.photo').clear();
    },

    save() {
      this.get('model').save();
    }
  }
});
