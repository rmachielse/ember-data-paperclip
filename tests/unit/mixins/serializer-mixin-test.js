/* jshint expr:true */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import Ember from 'ember';
import SerializerMixinMixin from 'ember-data-paperclip/mixins/serializer-mixin';

describe('SerializerMixin', function() {
  it('works', function() {
    const SerializerMixinObject = Ember.Object.extend(SerializerMixinMixin);

    let mixin = SerializerMixinObject.create();

    expect(mixin).to.be.ok;
  });
});
