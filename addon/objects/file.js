import Ember from 'ember';

/**
 * The File object
 *
 * @class FileObject
 * @module ember-data-paperclip/objects/file
 * @extends Ember.Object
 * @private
 */
export default Ember.Object.extend({
  store: Ember.inject.service(),

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
   * Wether the file has been set or changed
   *
   * @public
   */
  isEmptyOrDirty: Ember.computed.or('isEmpty', 'isDirty'),

  /**
   * The base64 file source
   *
   * If set, the data will be sent to the server on save
   *
   * @public
   */
  data: null,

  /**
   * The parent model
   *
   * The model that the file is an attribute on
   *
   * @private
   */
  model: Ember.computed('class', 'id', function() {
    return this.get('store').find(this.get('modelName'), this.get('id'));
  }),

  /**
   *
   *
   * @public
   */
  class: Ember.computed('modelName', function() {
    return this.get('modelName').pluralize();
  }),

  /**
   *
   *
   * @public
   */
  attachment: Ember.computed('key', function() {
    return this.get('key').pluralize();
  }),

  /**
   *
   *
   * @public
   */
  id_partition: Ember.computed('id', function() {
    let id = parseInt(this.get('id'));

    if (isNaN(id)) {
      return id.replace(/(....)/g, '/$1').slice(1);
    } else {
      return id.pad(9).replace(/(...)/g, '/$1').slice(1);
    }
  }),

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
    if (!this.get('isEmpty')) {
      if (Ember.isEmpty(style)) {
        style = this.get('defaultStyle');
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

  /**
   * Get blob data for a file
   *
   * @param {String} [style=defaultStyle] - The style to get the blob contents for
   * @return {Blob} The requested blob
   * @public
   */
  blob(style) {
    let url = this.url(style);

    return new Ember.RSVP.Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = (e) => {
        resolve(e.target.response);
      };
      xhr.onerror = reject;
      xhr.send();
    });
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
    if (!this.get('isEmpty')) {
      return new Ember.RSVP.Promise((resolve, reject) => {
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
    if (!this.get('isEmpty')) {
      return new Ember.RSVP.Promise((resolve, reject) => {
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
    return new Ember.RSVP.Promise((resolve, reject) => {
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
    this.set('isEmpty', false);
    this.set('isDirty', true);
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
