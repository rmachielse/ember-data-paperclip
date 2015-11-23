/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import objectUrl from 'ember-data-paperclip/utils/object-url';

describe('objectUrl', function() {
  // Replace this with your real tests.
  it('works', function() {
    var result = objectUrl();
    expect(result).to.be.ok;
  });
});
