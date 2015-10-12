import Ember from 'ember';

export default Ember.Object.extend({
  path: ':class/:attachment/:id_partition/:style/:filename.jpg',
  regex: /(:[a-z_]+)/gi,

  isEmpty: true,
  isDirty: false,

  data: null,

  store: Ember.inject.service(),

  model: Ember.computed('class', 'id', function() {
    return this.get('store').find(this.get('modelName'), this.get('id'));
  }),

  class: Ember.computed('modelName', function() {
    return this.get('modelName').pluralize();
  }),

  attachment: Ember.computed('key', function() {
    return this.get('key').pluralize();
  }),

  id_partition: Ember.computed('id', function() {
    var id = parseInt(this.get('id'));

    if (isNaN(id)) {
      return id.replace(/(....)/g, "/$1").slice(1);
    } else {
      return id.pad(9).replace(/(...)/g, "/$1").slice(1);
    }
  }),

  url(style) {
    if (!this.get('isEmpty')) {
      if (Ember.isEmpty(style)) {
        style = 'original';
      }

      return this.get('path').replace(this.get('regex'), (match) => {
        match = match.slice(1);

        if (match === 'style') {
          return style;
        } else if (!Ember.isEmpty(this.get(`model.${match}`))) {
          return this.get(`model.${match}`);
        } else if (!Ember.isEmpty(this.get(match))) {
          return this.get(match);
        }
      });
    }
  },

  contents(style) {
    var url = this.url(style);

    return new Ember.RSVP.Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();

      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = (e) => {
        resolve(window.URL.createObjectURL(e.target.response));
      };
      xhr.onerror = reject;

      xhr.send();
    });
  },

  clear() {
    this.set('isEmpty', true);
    this.set('isDirty', true);
  },

  recover() {
    this.set('isEmpty', false);
    this.set('isDirty', true);
  },

  serialize () {
    if (!this.get('isEmpty')) {
      return this.get('data');
    }
  }
});
