import Ember from 'ember';

export function fileUrl(params) {
  let [file, style] = params;

  return file.url(style);
}

/**
 * A helper to generate file urls from the template
 *
 * ```handlebars
 * {{file-url product.photo 'thumbnail'}}
 * ```
 *
 * @class FileUrlHelper
 * @module ember-data-paperclip/helpers/file-url
 * @public
 */
export default Ember.Helper.helper(fileUrl);
