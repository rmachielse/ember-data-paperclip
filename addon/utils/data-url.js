import Ember from 'ember';
import DS from 'ember-data';

const { computed, isEmpty } = Ember;
const { PromiseObject } = DS;

/**
 * A utility to get the base64 dataURL of a file
 *
 * The method will return a computed property that automatically watches the variables that
 * are involved in the generation of the data url
 *
 * ```javascript
 *   ...,
 *
 *   photo: attr('file'),
 *   photoDataURL: dataURL('file'),
 *
 *   ...
 * ```
 *
 * ```handlebars
 * <img src={{model.photoDataURL.content}} />
 * ```
 *
 * @module ember-data-paperclip/utils/data-url
 * @param {String} fileKey - The key at which the file object can be found
 * @param {String} [style=defaultStyle] - The style to get the data url for
 * @returns {Ember.ComputedProperty} A computed property containing a promise object whose `content` contains the base64 data url
 * @public
 */
export default function dataURL(fileKey, style) {
  return computed(function(urlKey) {
    let property = this[urlKey];

    if (isEmpty(property._dependentKeys)) {
      property.property.apply(property, this.get(`${fileKey}.variables`).addObjects(['photo.isNew', 'photo.isEmpty']));
    }

    let url = this.get(fileKey).dataURL(style);

    if (!isEmpty(url)) {
      return PromiseObject.create({
        promise: url
      });
    }
  });
}
