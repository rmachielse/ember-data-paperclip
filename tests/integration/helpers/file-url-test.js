import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import File from 'ember-data-paperclip/objects/file';

describe('Integration | Helper | file url', function() {
  setupComponentTest('file-url', {
    integration: true
  });

  beforeEach(function() {
    this.set('file', File.create({
      isEmpty: false,
      path: 'files/:style.jpg'
    }));
  });

  describe('without a given style', () => {
    it('renders a file url', function() {
      this.render(hbs`{{file-url file}}`);

      expect(this.$().text().trim()).to.equal('files/original.jpg');
    });
  });

  describe('with style thumbnail', () => {
    it('renders a file url', function() {
      this.render(hbs`{{file-url file 'thumbnail'}}`);

      expect(this.$().text().trim()).to.equal('files/thumbnail.jpg');
    });
  });
});
