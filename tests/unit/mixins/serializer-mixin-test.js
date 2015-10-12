import Ember from 'ember';
import FileSerializerMixinMixin from '../../../mixins/file-serializer-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | file serializer mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var FileSerializerMixinObject = Ember.Object.extend(FileSerializerMixinMixin);
  var subject = FileSerializerMixinObject.create();
  assert.ok(subject);
});
