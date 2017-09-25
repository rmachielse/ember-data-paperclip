import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Object | file', function() {
  setupTest('object:file', {
    needs: [
      'adapter:application',
      'serializer:application',
      'model:product'
    ]
  });

  let file;

  beforeEach(function() {
    let store = this.container.lookup('service:store');
    store.push({
      data: [{
        id: 1,
        type: 'product',
        attributes: {
          name: 'Example product'
        },
        relationships: {}
      }]
    });
  });

  describe('#model', () => {
    describe('without a modelName or id', () => {
      beforeEach(function() {
        file = this.subject();
      });

      it('should be empty', () => {
        expect(file.get('model')).to.not.exist;
      });
    });

    describe('with a modelName and id', () => {
      beforeEach(function() {
        file = this.subject({
          modelName: 'product',
          id: 1
        });
      });

      it('should be a model', () => {
        expect(file.get('model')).to.exist;
      });
    });
  });

  describe('#class', () => {
    describe('without a modelName', () => {
      beforeEach(function() {
        file = this.subject();
      });

      it('should be empty', () => {
        expect(file.get('class')).to.not.exist;
      });
    });

    describe('with a modelName', () => {
      beforeEach(function() {
        file = this.subject({
          modelName: 'product'
        });
      });

      it('should be the pluralized modelName', () => {
        expect(file.get('class')).to.be.a('string');
        expect(file.get('class')).to.equal('products');
      });
    });
  });

  describe('#attachment', () => {
    describe('without a key', () => {
      beforeEach(function() {
        file = this.subject();
      });

      it('should be empty', () => {
        expect(file.get('attachment')).to.not.exist;
      });
    });

    describe('with a key', () => {
      beforeEach(function() {
        file = this.subject({
          key: 'photo'
        });
      });

      it('should be the pluralized key', () => {
        expect(file.get('attachment')).to.be.a('string');
        expect(file.get('attachment')).to.equal('photos');
      });
    });
  });

  describe('#id_partition', () => {
    describe('without an id', () => {
      beforeEach(function() {
        file = this.subject();
      });

      it('should be empty', () => {
        expect(file.get('id_partition')).to.not.exist;
      });
    });

    describe('with an id', () => {
      beforeEach(function() {
        file = this.subject({
          id: 1
        });
      });

      it('should be partitioned id', () => {
        expect(file.get('id_partition')).to.be.a('string');
        expect(file.get('id_partition')).to.equal('000/000/001');
      });
    });

    describe('with an object hash id', () => {
      beforeEach(function() {
        file = this.subject({
          id: '562f984b4d42502419000000'
        });
      });

      it('should be partitioned id', () => {
        expect(file.get('id_partition')).to.be.a('string');
        expect(file.get('id_partition')).to.equal('562f/984b/4d42/5024/1900/0000');
      });
    });
  });

  describe('#variables', () => {
    describe('with an empty path', () => {
      beforeEach(function() {
        file = this.subject({
          path: ':style.jpg'
        });
      });

      it('should be a list of path variables', () => {
        expect(file.get('variables')).to.be.a('array');
        expect(file.get('variables')).to.deep.equal([]);
      });
    });

    describe('with a simple path', () => {
      beforeEach(function() {
        file = this.subject({
          path: ':attachment/:style.png',
          key: 'photo'
        });
      });

      it('should be a list of path variables', () => {
        expect(file.get('variables')).to.be.a('array');
        expect(file.get('variables')).to.deep.equal(['photo.attachment']);
      });
    });

    describe('with the default path', () => {
      beforeEach(function() {
        file = this.subject({
          key: 'photo',
          modelName: 'product',
          id: 1
        });
      });

      it('should be a list of path variables', () => {
        expect(file.get('variables')).to.be.a('array');
        expect(file.get('variables')).to.deep.equal(['photo.class', 'photo.attachment', 'photo.id_partition']);
      });
    });
  });

  describe('#url', () => {
    describe('with an empty file', () => {
      beforeEach(function() {
        file = this.subject();
      });

      it('should be empty', () => {
        expect(file.url()).to.not.exist;
      });
    });

    describe('with a simple path', () => {
      beforeEach(function() {
        file = this.subject({
          isEmpty: false,
          path: ':attachment/:style.png',
          key: 'photo'
        });
      });

      describe('without a given style', () => {
        it('should be a url', () => {
          expect(file.url()).to.be.a('string');
          expect(file.url()).to.equal('photos/original.png');
        });
      });

      describe('with style thumbnail', () => {
        it('should be a thumbnail url', () => {
          expect(file.url('thumbnail')).to.be.a('string');
          expect(file.url('thumbnail')).to.equal('photos/thumbnail.png');
        });
      });
    });
  });

  describe('#blob', () => {
    describe('with an empty file', () => {
      beforeEach(function() {
        file = this.subject();
      });

      it('should be empty', () => {
        expect(file.blob()).to.not.exist;
      });
    });

    describe('with a simple path', () => {
      beforeEach(function() {
        file = this.subject({
          isEmpty: false,
          path: ':attachment/:style.png',
          key: 'photo'
        });
      });

      describe('without a given style', () => {
        it('should be a blob', () => {
          return file.blob().then((blob) => {
            expect(blob).to.be.instanceof(window.Blob);
          });
        });
      });

      describe('with style thumbnail', () => {
        it('should be a thumbnail blob', () => {
          return file.blob('thumbnail').then((blob) => {
            expect(blob).to.be.instanceof(window.Blob);
          });
        });
      });
    });
  });

  describe('#objectURL', () => {
    describe('with an empty file', () => {
      beforeEach(function() {
        file = this.subject();
      });

      it('should be empty', () => {
        expect(file.objectURL()).to.not.exist;
      });
    });

    describe('with a simple path', () => {
      beforeEach(function() {
        file = this.subject({
          isEmpty: false,
          path: ':attachment/:style.png',
          key: 'photo'
        });
      });

      describe('without a given style', () => {
        it('should be an object url', () => {
          return file.objectURL().then((objectURL) => {
            expect(objectURL).to.be.a('string');
            expect(objectURL).to.have.string('blob:');
          });
        });
      });

      describe('with style thumbnail', () => {
        it('should be a thumbnail object url', () => {
          return file.objectURL('thumbnail').then((objectURL) => {
            expect(objectURL).to.be.a('string');
            expect(objectURL).to.have.string('blob:');
          });
        });
      });
    });
  });

  describe('#dataURL', () => {
    describe('with an empty file', () => {
      beforeEach(function() {
        file = this.subject();
      });

      it('should be empty', () => {
        expect(file.dataURL()).to.not.exist;
      });
    });

    describe('with a simple path', () => {
      beforeEach(function() {
        file = this.subject({
          isEmpty: false,
          path: ':attachment/:style.png',
          key: 'photo'
        });
      });

      describe('without a given style', () => {
        it('should be a data url', () => {
          return file.dataURL().then((dataURL) => {
            expect(dataURL).to.be.a('string');
            expect(dataURL).to.have.string('data:');
            expect(dataURL).to.have.string('base64');
          });
        });
      });

      describe('with style thumbnail', () => {
        it('should be a thumbnail data url', () => {
          return file.dataURL('thumbnail').then((dataURL) => {
            expect(dataURL).to.be.a('string');
            expect(dataURL).to.have.string('data:');
            expect(dataURL).to.have.string('base64');
          });
        });
      });
    });
  });

  describe('#clear', () => {
    beforeEach(function() {
      file = this.subject({
        isEmpty: false
      });

      file.clear();
    });

    it('should clear the file', () => {
      expect(file.get('isEmpty')).to.be.true;
      expect(file.get('isDirty')).to.be.true;
    });
  });

  describe('#rollback', () => {
    beforeEach(function() {
      file = this.subject({
        isDirty: true
      });

      file.rollback();
    });

    it('should rollback the file', () => {
      expect(file.get('isEmpty')).to.be.false;
      expect(file.get('isDirty')).to.be.false;
    });
  });

  describe('#serialize', () => {
    describe('when empty', () => {
      beforeEach(function() {
        file = this.subject();
      });

      it('should return the data', () => {
        expect(file.serialize()).to.not.exist;
      });
    });

    describe('when not empty', () => {
      beforeEach(function() {
        file = this.subject({
          isEmpty: false,
          data: 'data'
        });
      });

      it('should return the data', () => {
        expect(file.serialize()).to.equal('data');
      });
    });
  });
});
