/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import dataUrl from 'ember-data-paperclip/utils/data-url';

describe('dataUrl', function() {
  // Replace this with your real tests.
  it('works', function() {
    var result = dataUrl();
    expect(result).to.be.ok;
  });
});
