import { expect } from 'chai';
import { describe, it } from 'mocha';
import Ember from 'ember';
import SerializerMixinMixin from 'ember-data-paperclip/mixins/serializer-mixin';

const { Object: EmberObject } = Ember;

describe('Unit | Mixin | serializer mixin', function() {
  it('works', function() {
    let SerializerMixinObject = EmberObject.extend(SerializerMixinMixin);

    let subject = SerializerMixinObject.create();

    expect(subject).to.be.ok;
  });
});
