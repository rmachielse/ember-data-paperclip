import { moduleFor, test } from 'ember-qunit';

moduleFor('transform:file', 'Unit | Transform | file');

test('it exists', function(assert) {
  assert.expect(3);

  var transform = this.subject();

  assert.ok(transform);
  assert.equal(typeof(transform.serialize), 'function');
  assert.equal(typeof(transform.deserialize), 'function');
});
