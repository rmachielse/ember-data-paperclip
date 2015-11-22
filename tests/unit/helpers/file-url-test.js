/* jshint expr:true */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { fileUrl } from 'ember-data-paperclip/helpers/file-url';
import File from 'ember-data-paperclip/objects/file';

describe('FileUrlHelper', function() {
  it('works', function() {
    let file = File.create({
      isEmpty: false,
      path: 'files/:style.jpg'
    });

    expect(fileUrl([file])).to.equal('files/original.jpg');
    expect(fileUrl([file, 'thumbnail'])).to.equal('files/thumbnail.jpg');
  });
});
