import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Ember from 'ember';
import File from 'ember-data-paperclip/objects/file';
import fileUrl from 'ember-data-paperclip/utils/file-url';

const { Object: EmberObject } = Ember;

describe('Unit | Utility | file url', function() {
  let file, obj;

  beforeEach(() => {
    file = File.create({
      isEmpty: false,
      path: 'files/:style.jpg'
    });
  });

  describe('without a given style', () => {
    beforeEach(() => {
      obj = EmberObject.extend({
        url: fileUrl('file')
      }).create({ file });
    });

    it('should return a file url', () => {
      expect(obj.get('url')).to.equal('files/original.jpg');
    });
  });

  describe('with style thumbnail', () => {
    beforeEach(() => {
      obj = EmberObject.extend({
        url: fileUrl('file', 'thumbnail')
      }).create({ file });
    });

    it('should return a file url', () => {
      expect(obj.get('url')).to.equal('files/thumbnail.jpg');
    });
  });
});
