import DS from 'ember-data';
import config from '../config/environment';

export default DS.Transform.extend({
  deserialize: function(serialized, key, typeClass, id) {
    var File = this.container.lookupFactory('object:file');

    return File.create(serialized, config['paperclip'], {
      key: key,
      modelName: typeClass.modelName,
      id: id,
      isEmpty: Ember.isEmpty(serialized)
    });
  },

  serialize: function(deserialized) {
    return deserialized.serialize();
  }
});
