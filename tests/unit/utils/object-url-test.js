/* jshint expr:true */
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Ember from 'ember';
import DS from 'ember-data';
import File from 'ember-data-paperclip/objects/file';
import objectURL from 'ember-data-paperclip/utils/object-url';

const { PromiseObject } = DS;

describe('objectURL', function() {
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
        url: objectURL('file')
      }).create({ file });
    });

    it('should return an object url', () => {
      expect(obj.get('url')).to.be.instanceof(PromiseObject);
      expect(obj.get('url')).to.have.property('content');
      return obj.get('url').then(() => {
        expect(obj.get('url.content')).to.be.a('string');
        expect(obj.get('url.content')).to.have.string('blob:');
      });
    });
  });

  describe('with style thumbnail', () => {
    beforeEach(() => {
      obj = Ember.Object.extend({
        url: objectURL('file', 'thumbnail')
      }).create({ file });
    });

    it('should return an object url', () => {
      expect(obj.get('url')).to.be.instanceof(PromiseObject);
      expect(obj.get('url')).to.have.property('content');
      return obj.get('url').then(() => {
        expect(obj.get('url.content')).to.be.a('string');
        expect(obj.get('url.content')).to.have.string('blob:');
      });
    });
  });
});
