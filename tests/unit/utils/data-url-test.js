import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Ember from 'ember';
import DS from 'ember-data';
import File from 'ember-data-paperclip/objects/file';
import dataUrl from 'ember-data-paperclip/utils/data-url';

const { Object: EmberObject } = Ember;
const { PromiseObject } = DS;

describe('Unit | Utility | data url', function() {
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
        url: dataUrl('file')
      }).create({ file });
    });

    it('should return a data url', () => {
      expect(obj.get('url')).to.be.instanceof(PromiseObject);
      expect(obj.get('url')).to.have.property('content');
      return obj.get('url').then(() => {
        expect(obj.get('url.content')).to.be.a('string');
        expect(obj.get('url.content')).to.have.string('data:');
        expect(obj.get('url.content')).to.have.string('base64');
      });
    });
  });

  describe('with style thumbnail', () => {
    beforeEach(() => {
      obj = EmberObject.extend({
        url: dataUrl('file', 'thumbnail')
      }).create({ file });
    });

    it('should return a data url', () => {
      expect(obj.get('url')).to.be.instanceof(PromiseObject);
      expect(obj.get('url')).to.have.property('content');
      return obj.get('url').then(() => {
        expect(obj.get('url.content')).to.be.a('string');
        expect(obj.get('url.content')).to.have.string('data:');
        expect(obj.get('url.content')).to.have.string('base64');
      });
    });
  });
});
