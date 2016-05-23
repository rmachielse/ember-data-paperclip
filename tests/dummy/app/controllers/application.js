import Ember from 'ember';
import dataURL from 'ember-data-paperclip/utils/data-url';
import objectURL from 'ember-data-paperclip/utils/object-url';

const { Controller } = Ember;

export default Controller.extend({
  dataURL: dataURL('model.photo'),
  objectURL: objectURL('model.photo'),

  isPersisted: false,

  actions: {
    save() {
      this.get('model').save().then(() => {
        this.set('isPersisted', true);
      });
    }
  }
});
