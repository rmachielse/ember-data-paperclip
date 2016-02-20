import Ember from 'ember';

const { computed, isEmpty } = Ember;

/**
 * A utility to get the url of a file
 *
 * The method will return a computed property that automatically watches the variables that
 * are involved in the generation of the url
 *
 * ```javascript
 *   ...,
 *
 *   photo: attr('file'),
 *   photoURL: fileURL('file'),
 *
 *   ...
 * ```
 *
 * ```handlebars
 * <img src={{model.photoURL}} />
 * ```
 *
 * @module ember-data-paperclip/utils/file-url
 * @param {String} fileKey - The key at which the file object can be found
 * @param {String} [style=defaultStyle] - The style to get the url for
 * @returns {Ember.ComputedProperty} A computed property containing the url
 * @public
 */
export default function fileURL(fileKey, style) {
  return computed(function(urlKey) {
    let property = this[urlKey];

    if (isEmpty(property._dependentKeys)) {
      property.property.apply(property, this.get(`${fileKey}.variables`).addObjects(['photo.isNew', 'photo.isEmpty']));
    }

    return this.get(fileKey).url(style);
  });
}
