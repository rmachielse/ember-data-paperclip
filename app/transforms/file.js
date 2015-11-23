import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

const { isEmpty } = Ember;
const { Transform } = DS;

/**
 * A file transform for Ember-Data.
 *
 * The will enable files to be used as an Ember Data attribute:
 *
 * ```javascript
 * // app/models/product.js
 * import DS from 'ember-data';
 *
 * export default DS.Model.extend({
 *   photo: DS.attr('file')
 * })
 * ```
 *
 * @module app/transforms/file
 * @private
 */
export default Transform.extend({
  /**
   * Deserialize file json to a file object
   *
   * @public
   */
  deserialize: function(serialized, key, typeClass, id) {
    const File = this.container.lookupFactory('object:file');

    return File.create(serialized, config['paperclip'], {
      key: key,
      modelName: typeClass.modelName,
      id: id,
      isNew: isEmpty(serialized),
      isEmpty: isEmpty(serialized),
      attributes: Object.keys(serialized || {})
    });
  },

  /**
   * Serialize a file object to json
   *
   * @public
   */
  serialize: function(deserialized) {
    return deserialized.serialize();
  }
});
