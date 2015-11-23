/* jshint expr:true */
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Ember from 'ember';
import DS from 'ember-data';
import File from 'ember-data-paperclip/objects/file';
import dataURL from 'ember-data-paperclip/utils/data-url';

const { PromiseObject } = DS;

describe('dataURL', function() {
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
        url: dataURL('file')
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
      obj = Ember.Object.extend({
        url: dataURL('file', 'thumbnail')
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
