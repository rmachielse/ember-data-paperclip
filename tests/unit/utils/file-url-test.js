/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import fileUrl from 'ember-data-paperclip/utils/file-url';

describe('fileUrl', function() {
  // Replace this with your real tests.
  it('works', function() {
    var result = fileUrl();
    expect(result).to.be.ok;
  });
});
