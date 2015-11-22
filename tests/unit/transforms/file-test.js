/* jshint expr:true */
import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule('transform:file', 'FileTransform', function() {
  it('exists', function() {
    let transform = this.subject();

    expect(transform).to.be.ok;

    expect(typeof transform.serialize).to.equal('function');
    expect(typeof transform.deserialize).to.equal('function');
  });
});
