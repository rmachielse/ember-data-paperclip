/* jshint expr:true */
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { fileUrl } from 'ember-data-paperclip/helpers/file-url';
import File from 'ember-data-paperclip/objects/file';

describe('FileUrlHelper', function() {
  let file;

  beforeEach(() => {
    file = File.create({
      isEmpty: false,
      path: 'files/:style.jpg'
    });
  });

  describe('without a given style', () => {
    it('should return a file url', () => {
      expect(fileUrl([file])).to.equal('files/original.jpg');
    });
  });

  describe('with style thumbnail', () => {
    it('should return a file url', () => {
      expect(fileUrl([file, 'thumbnail'])).to.equal('files/thumbnail.jpg');
    });
  });
});
