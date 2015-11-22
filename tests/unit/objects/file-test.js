/* jshint expr:true */
import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule('object:file', 'FileObject', function() {
  it('exists', function() {
    let object = this.subject();
    expect(object).to.be.ok;
  });
});
