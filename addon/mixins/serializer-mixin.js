import Ember from 'ember';

/**
 * A mixin for the Ember Data adapter
 *
 * ```javascript
 * // app/serializers/application.js
 *
 * import DS from 'ember-data';
 * import SerializerMixin from 'ember-data-paperclip/mixins/serializer-mixin';
 *
 * export default DS.RESTAdapter.extend(SerializerMixin);
 * ```
 *
 * @class SerializerMixin
 * @module ember-data-paperclip/mixins/serializer-mixin
 * @extends Ember.Mixin
 * @public
 */
export default Ember.Mixin.create({
  /**
   * Transforms attributes
   *
   * Behaves like it's parent but provides transforms with more contextual data
   *
   * @private
   */
  applyTransforms(typeClass, data) {
    typeClass.eachTransformedAttribute((key, attributeType) => {
      if (!data.hasOwnProperty(key)) {
        return;
      }

      let transform = this.transformFor(attributeType);
      let primaryKey = this.get('primaryKey');
      let id = data[primaryKey];

      data[key] = transform.deserialize(data[key], key, typeClass, id);
    });

    return data;
  },

  /**
   * Serialize an attribute
   *
   * Behaves like it's parent but skips file attributes if they aren't dirty
   *
   * @private
   */
  serializeAttribute(record, json, key, attribute) {
    if (attribute.type !== 'file' || record.get(`${key}.isDirty`)) {
      this._super(record, json, key, attribute);
    }
  }
});
