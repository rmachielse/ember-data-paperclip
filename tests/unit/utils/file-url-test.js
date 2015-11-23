/* jshint expr:true */
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Ember from 'ember';
import File from 'ember-data-paperclip/objects/file';
import fileURL from 'ember-data-paperclip/utils/file-url';

describe('fileURL', function() {
  let file, obj;

  beforeEach(() => {
    file = File.create({
      isEmpty: false,
      path: 'files/:style.jpg'
    });
  });

  describe('without a given style', () => {
    beforeEach(() => {
      obj = Ember.Object.extend({
        url: fileURL('file')
      }).create({ file });
    });

    it('should return a file url', () => {
      expect(obj.get('url')).to.equal('files/original.jpg');
    });
  });

  describe('with style thumbnail', () => {
    beforeEach(() => {
      obj = Ember.Object.extend({
        url: fileURL('file', 'thumbnail')
      }).create({ file });
    });

    it('should return a file url', () => {
      expect(obj.get('url')).to.equal('files/thumbnail.jpg');
    });
  });
});
