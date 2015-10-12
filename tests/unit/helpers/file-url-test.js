import { fileUrl } from '../../../helpers/file-url';
import File from '../../../objects/file';
import { module, test } from 'qunit';

module('Unit | Helper | file url');

test('it works', function(assert) {
  assert.expect(2);

  var file = File.create({
    isEmpty: false,
    path: 'files/:style.jpg'
  });

  assert.equal(fileUrl([file]), 'files/original.jpg');
  assert.equal(fileUrl([file, 'thumbnail']), 'files/thumbnail.jpg');
});
