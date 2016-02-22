import Ember from 'ember';

const { RSVP: { Promise }, Evented, inject: { service }, computed, isEmpty, isPresent } = Ember;

/**
 * The File object
 *
 * @module ember-data-paperclip/objects/file
 * @extends Ember.Object
 * @private
 */
export default Ember.Object.extend(Evented, {
  store: service(),

  /**
   * A regex to match path variables using semicolons
   *
   * @private
   */
  regex: /(:[a-z_]+)/gi,

  /**
   * The default path
   *
   * @public
   */
  path: ':class/:attachment/:id_partition/:style/:filename.jpg',

  /**
   * The default style
   *
   * @public
   */
  defaultStyle: 'original',

  /**
   * Wether the file is new on this model
   *
   * @public
   */
  isNew: false,

  /**
   * Wether the file has been set
   *
   * @public
   */
  isEmpty: true,

  /**
   * Wether the file has been changed
   *
   * @public
   */
  isDirty: false,

  /**
   * The key on the model for this file object
   *
   * @public
   */
  key: null,

  /**
   * The model name of the parent model
   *
   * @public
   */
  modelName: null,

  /**
   * The id of the parent model
   *
   * @public
   */
  id: null,

  /**
   * The base64 file source
   *
   * If set, the data will be sent to the server on save
   *
   * @public
   */
  data: null,

  /**
   * The attributes names retrieved through JSON
   *
   * @public
   */
  attributes: [],

  /**
   * The parent model
   *
   * The model that the file is an attribute on
   *
   * @private
   */
  model: computed('modelName', 'id', function() {
    if (isPresent(this.get('modelName')) && isPresent(this.get('id'))) {
      return this.get('store').find(this.get('modelName'), this.get('id'));
    }
  }),

  /**
   * The class name of the model
   *
   * @public
   */
  class: computed('modelName', function() {
    if (isPresent(this.get('modelName'))) {
      return this.get('modelName').pluralize();
    }
  }),

  /**
   * The name of the attachment
   *
   * @public
   */
  attachment: computed('key', function() {
    if (isPresent(this.get('key'))) {
      return this.get('key').pluralize();
    }
  }),

  /**
   * The id, partitioned in parts
   *
   * @public
   */
  id_partition: computed('id', function() {
    if (isPresent(this.get('id'))) {
      if (isNaN(this.get('id'))) {
        return this.get('id').replace(/(....)/g, '/$1').slice(1);
      } else {
        let id = String(this.get('id'));

        while (id.length < 9) {
          id = `0${id}`;
        }

        return id.replace(/(...)/g, '/$1').slice(1);
      }
    }
  }),

  /**
   * The variables that are used by `path`
   *
   * @public
   */
  variables: computed('path', function() {
    return this.get('path').match(this.get('regex')).map((match) => {
      match = match.slice(1);

      if (isPresent(this.get(`model.${match}`))) {
        return match;
      } else if (isPresent(this.get(match))) {
        return `${this.get('key')}.${match}`;
      }
    }).compact();
  }),

  /**
   * The initialize method
   *
   * Subscribes the object on the model's `rolledBack` event
   *
   * @private
   */
  init() {
    if (isPresent(this.get('model'))) {
      this.get('model').then(() => {
        this.get('model.content').on('rolledBack', this, this.rollback);
      });
    }
  },

  /**
   * Generate urls for different styles
   *
   * ```javascript
   * var url = product.get('photo').url();
   * // products/photos/000/000/001/original/data.jpg
   *
   * var thumbnailUrl = product.get('photo').url('thumbnail');
   * // products/photos/000/000/001/thumbnail/data.jpg
   * ```
   *
   * @param {String} [style=defaultStyle] - The style to generate a url for
   * @return {String} The generated url
   * @public
   */
  url(style) {
    if (!this.get('isNew') && !this.get('isEmpty')) {
      if (isEmpty(style)) {
        style = this.get('defaultStyle');
      }

      return this.get('path').replace(this.get('regex'), (match) => {
        match = match.slice(1);

        if (match === 'style') {
          return style;
        } else if (isPresent(this.get(`model.${match}`))) {
          return this.get(`model.${match}`);
        } else if (isPresent(this.get(match))) {
          return this.get(match);
        }
      });
    }
  },

  /**
   * Get blob data for a file
   *
   * @param {String} [style=defaultStyle] - The style to get the blob contents for
   * @return {Blob} The requested blob
   * @public
   */
  blob(style) {
    if (!this.get('isNew') && !this.get('isEmpty')) {
      if (isEmpty(style)) {
        style = this.get('defaultStyle');
      }

      let url = this.url(style);

      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.responseType = 'blob';
        xhr.onload = (e) => {
          resolve(e.target.response);
        };
        xhr.onerror = reject;

        xhr.send();
      });
    }
  },

  /**
   * Get the objectURL of a file
   *
   * ```javascript
   * product.get('photo').objectURL('thumbnail').then((thumbnailObjectURL) => {
   *   console.log(thumbnailObjectURL);
   * });
   * ```
   *
   * @param {String} [style=defaultStyle] - The style to generate the objectURL for
   * @return {Ember.RSVP.Promise} A promise object that resolves with the object url
   * @public
   */
  objectURL(style) {
    if (!this.get('isNew') && !this.get('isEmpty')) {
      if (isEmpty(style)) {
        style = this.get('defaultStyle');
      }

      return new Promise((resolve, reject) => {
        this.blob(style).then((blob) => {
          resolve(window.URL.createObjectURL(blob));
        }, reject);
      });
    }
  },

  /**
   * Get the base64 dataURL of a file
   *
   * ```javascript
   * product.get('photo').dataURL('thumbnail').then((thumbnailDataURL) => {
   *   window.open(thumbnailDataURL);
   * });
   * ```
   *
   * @param {String} [style=defaultStyle] - The style to generate the dataURL for
   * @return {Ember.RSVP.Promise} A promise object that resolves with the data url
   * @public
   */
  dataURL(style) {
    if (!this.get('isNew') && !this.get('isEmpty')) {
      if (isEmpty(style)) {
        style = this.get('defaultStyle');
      }

      return new Promise((resolve, reject) => {
        this.blob(style).then((blob) => {
          let reader = new FileReader();

          reader.onload = (e) => {
            resolve(e.target.result);
          };
          reader.onerror = reject;

          reader.readAsDataURL(blob);
        }, reject);
      });
    }
  },

  /**
   * Update the file source
   *
   * ```javascript
   *   ...
   *
   *   change: function (e) {
   *     this.get('product').get('photo').update(e.target.files[0]);
   *   },
   *
   *   ...
   * ```
   *
   * When the model is saved, the json will look like this:
   *
   * ```javascript
   * // POST /products/1
   *
   * {
   *   "product": {
   *     "id": 1,
   *     "photo": "[base64data]"
   *   }
   * }
   * ```
   *
   * @param {File} file - The resulting file from a file upload or drop action
   * @return {Ember.RSVP.Promise} - A promise object that resolves when the source has been succesfully set
   * @public
   */
  update(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.set('data', e.target.result);
        this.set('isEmpty', false);
        this.set('isDirty', true);
      };
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  },

  /**
   * Clear the file
   *
   * ```javascript
   * product.get('photo').clear();
   * product.save();
   * ```
   *
   * This will result in an empty file object when the model is being saved:
   * ```javascript
   * // POST /products/1
   *
   * {
   *   "product": {
   *     "id": 1,
   *     "photo": null
   *   }
   * }
   * ```
   *
   * @public
   */
  clear() {
    this.set('isEmpty', true);
    this.set('isDirty', true);
  },

  /**
   * Rollback the file
   *
   * This will undo a clear action
   *
   * @public
   */
  rollback() {
    this.set('isEmpty', this.get('isNew'));
    this.set('isDirty', false);
  },

  /**
   * Serialize the file object to json
   *
   * @return {Object} The json data
   * @private
   */
  serialize() {
    if (!this.get('isEmpty')) {
      return this.get('data');
    } else {
      return null;
    }
  }
});
