import Ember from 'ember';

const { Helper: { helper } } = Ember;

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
 * @module ember-data-paperclip/helpers/file-url
 * @public
 */
export default helper(fileUrl);
