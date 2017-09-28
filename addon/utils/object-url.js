import Ember from 'ember';
import DS from 'ember-data';

const { computed, isEmpty, isPresent } = Ember;
const { PromiseObject } = DS;

/**
 * A utility to get the objectURL of a file
 *
 * The method will return a computed property that automatically watches the variables that
 * are involved in the generation of the object url
 *
 * ```javascript
 *   ...,
 *
 *   photo: attr('file'),
 *   photoObjectURL: objectURL('file'),
 *
 *   ...
 * ```
 *
 * ```handlebars
 * <img src={{model.photoObjectURL.content}} />
 * ```
 *
 * @module ember-data-paperclip/utils/object-url
 * @param {String} fileKey - The key at which the file object can be found
 * @param {String} [style=defaultStyle] - The style to get the object url for
 * @returns {Ember.ComputedProperty} A computed property containing a promise object whose `content` contains the object url
 * @public
 */
export default function objectURL(fileKey, style) {
  return computed(function(urlKey) {
    let property = this[urlKey];

    if (isEmpty(property._dependentKeys)) {
      property.property(...this.get(`${fileKey}.variables`).addObjects(['photo.isNew', 'photo.isEmpty']));
    }

    let url = this.get(fileKey).objectURL(style);

    if (isPresent(url)) {
      return PromiseObject.create({
        promise: url
      });
    }
  });
}
