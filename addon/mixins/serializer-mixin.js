import Ember from 'ember';

const { Mixin } = Ember;

/**
 * A mixin for the Ember Data serializer
 *
 * ```javascript
 * // app/serializers/application.js
 *
 * import DS from 'ember-data';
 * import SerializerMixin from 'ember-data-paperclip/mixins/serializer-mixin';
 *
 * export default DS.ActiveModelSerializer.extend(SerializerMixin);
 * ```
 *
 * @module ember-data-paperclip/mixins/serializer-mixin
 * @extends Ember.Mixin
 * @public
 */
export default Mixin.create({
  /**
   * normalize
   *
   * Behaves like it's parent but provides applyTransforms with id as well
   *
   * @private
   */
  normalize(modelClass, resourceHash) {
    let data = null;

    if (resourceHash) {
      this.normalizeUsingDeclaredMapping(modelClass, resourceHash);

      data = {
        id:            this.extractId(modelClass, resourceHash),
        type:          modelClass.modelName,
        attributes:    this.extractAttributes(modelClass, resourceHash),
        relationships: this.extractRelationships(modelClass, resourceHash)
      };

      this.applyTransforms(modelClass, data.attributes, data.id);
    }

    return { data };
  },
  /**
   * Transforms attributes
   *
   * Behaves like it's parent but provides transforms with more contextual data
   *
   * @private
   */
  applyTransforms(typeClass, data, id) {
    typeClass.eachTransformedAttribute((key, attributeType) => {
      if (!data.hasOwnProperty(key)) {
        return;
      }

      let transform = this.transformFor(attributeType);
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
  serializeAttribute(snapshot, json, key, attribute) {
    if (attribute.type !== 'file' || snapshot.attr(key).get('isDirty')) {
      this._super(snapshot, json, key, attribute);
    }
  }
});
