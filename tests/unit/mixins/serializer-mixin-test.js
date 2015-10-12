import Ember from 'ember';
import SerializerMixin from 'ember-data-paperclip/mixins/serializer-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | SerializerMixin');

test('it works', function(assert) {
  var SerializerMixinObject = Ember.Object.extend(SerializerMixin);
  var subject = SerializerMixinObject.create();
  assert.ok(subject);
});
