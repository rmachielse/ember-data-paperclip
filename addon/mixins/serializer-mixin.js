import Ember from 'ember';

export default Ember.Mixin.create({
  applyTransforms: function(typeClass, data) {
    typeClass.eachTransformedAttribute((key, attributeType) => {
      if (!data.hasOwnProperty(key)) { return; }

      var transform = this.transformFor(attributeType);
      data[key] = transform.deserialize(data[key], key, typeClass, this.extractId(typeClass, data));
    });

    return data;
  },

  serializeAttribute: function(record, json, key, attribute) {
    if (attribute.type !== 'file' || record.get(`${key}.isDirty`)) {
      this._super(record, json, key, attribute);
    }
  }
});
